import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''API для управления портфолио (фото и видео)'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ['DATABASE_URL']
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if method == 'GET':
            data_type = event.get('queryStringParameters', {}).get('type', 'portfolio')
            
            if data_type == 'portfolio':
                cur.execute(
                    "SELECT id, title, category, image_url, display_order FROM portfolio_items ORDER BY display_order, created_at DESC"
                )
                columns = ['id', 'title', 'category', 'image_url', 'display_order']
                items = [dict(zip(columns, row)) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'items': items}),
                    'isBase64Encoded': False
                }
            
            elif data_type == 'videos':
                cur.execute(
                    "SELECT id, title, description, video_url, thumbnail_url, display_order FROM videos ORDER BY display_order, created_at DESC"
                )
                columns = ['id', 'title', 'description', 'video_url', 'thumbnail_url', 'display_order']
                videos = [dict(zip(columns, row)) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'videos': videos}),
                    'isBase64Encoded': False
                }
            
            elif data_type == 'profile':
                cur.execute(
                    "SELECT full_name, bio, height, bust, waist, hips, clothing_size, shoe_size, dress_size, jeans_size, hair_color, eye_color, age, experience_years, main_photo_url FROM profile LIMIT 1"
                )
                row = cur.fetchone()
                if row:
                    columns = ['full_name', 'bio', 'height', 'bust', 'waist', 'hips', 'clothing_size', 'shoe_size', 'dress_size', 'jeans_size', 'hair_color', 'eye_color', 'age', 'experience_years', 'main_photo_url']
                    profile = dict(zip(columns, row))
                else:
                    profile = None
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'profile': profile}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            data_type = body.get('type', 'portfolio')
            
            if data_type == 'portfolio':
                title = body.get('title')
                category = body.get('category')
                image_url = body.get('image_url')
                display_order = body.get('display_order', 0)
                
                cur.execute(
                    "INSERT INTO portfolio_items (title, category, image_url, display_order) VALUES (%s, %s, %s, %s) RETURNING id",
                    (title, category, image_url, display_order)
                )
                item_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'id': item_id}),
                    'isBase64Encoded': False
                }
            
            elif data_type == 'video':
                title = body.get('title')
                description = body.get('description', '')
                video_url = body.get('video_url')
                thumbnail_url = body.get('thumbnail_url')
                display_order = body.get('display_order', 0)
                
                cur.execute(
                    "INSERT INTO videos (title, description, video_url, thumbnail_url, display_order) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                    (title, description, video_url, thumbnail_url, display_order)
                )
                video_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'id': video_id}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            item_id = query_params.get('id')
            data_type = query_params.get('type', 'portfolio')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID обязателен'}),
                    'isBase64Encoded': False
                }
            
            if data_type == 'portfolio':
                cur.execute("DELETE FROM portfolio_items WHERE id = %s", (item_id,))
            elif data_type == 'video':
                cur.execute("DELETE FROM videos WHERE id = %s", (item_id,))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
