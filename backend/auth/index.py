import json
import os
import psycopg2
import hashlib
import secrets
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''API для аутентификации администратора'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action', 'login')
            
            dsn = os.environ['DATABASE_URL']
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            
            if action == 'register':
                email = body.get('email')
                password = body.get('password')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                
                try:
                    cur.execute(
                        "INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id",
                        (email, password_hash)
                    )
                    user_id = cur.fetchone()[0]
                    conn.commit()
                    
                    token = secrets.token_urlsafe(32)
                    
                    return {
                        'statusCode': 201,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'userId': user_id,
                            'token': token
                        }),
                        'isBase64Encoded': False
                    }
                except psycopg2.IntegrityError:
                    conn.rollback()
                    return {
                        'statusCode': 409,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь уже существует'}),
                        'isBase64Encoded': False
                    }
                finally:
                    cur.close()
                    conn.close()
            
            elif action == 'login':
                email = body.get('email')
                password = body.get('password')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                
                cur.execute(
                    "SELECT id FROM users WHERE email = %s AND password_hash = %s",
                    (email, password_hash)
                )
                result = cur.fetchone()
                cur.close()
                conn.close()
                
                if result:
                    user_id = result[0]
                    token = secrets.token_urlsafe(32)
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'userId': user_id,
                            'token': token
                        }),
                        'isBase64Encoded': False
                    }
                else:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный email или пароль'}),
                        'isBase64Encoded': False
                    }
        
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
