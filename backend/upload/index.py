import json
import os
import base64
import boto3
import uuid
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для загрузки файлов в S3'''
    
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
            
            file_data = body.get('file')
            file_type = body.get('type', 'image/jpeg')
            folder = body.get('folder', 'portfolio')
            
            if not file_data:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Файл не предоставлен'}),
                    'isBase64Encoded': False
                }
            
            file_bytes = base64.b64decode(file_data)
            
            extension_map = {
                'image/jpeg': 'jpg',
                'image/jpg': 'jpg',
                'image/png': 'png',
                'image/webp': 'webp',
                'video/mp4': 'mp4',
                'video/webm': 'webm'
            }
            
            extension = extension_map.get(file_type, 'jpg')
            file_name = f"{folder}/{uuid.uuid4()}.{extension}"
            
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            
            s3.put_object(
                Bucket='files',
                Key=file_name,
                Body=file_bytes,
                ContentType=file_type
            )
            
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'url': cdn_url
                }),
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
