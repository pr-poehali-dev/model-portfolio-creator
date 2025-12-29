import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URLS = {
  auth: 'https://functions.poehali.dev/500e7c00-3693-48da-90d7-777743524c3f',
  upload: 'https://functions.poehali.dev/5ad0f8f0-6a6d-4412-ae52-67e36c17d4a1',
  portfolio: 'https://functions.poehali.dev/706554e8-d97a-406e-be6b-f2bc0f367c6c'
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    category: 'fashion',
    image: null as File | null
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    video_url: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        toast({ title: 'Успешный вход', description: 'Добро пожаловать в админ-панель!' });
        loadData();
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Неверные данные', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось войти', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        toast({ title: 'Регистрация успешна', description: 'Аккаунт создан!' });
        loadData();
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось зарегистрироваться', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось зарегистрироваться', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const portfolioResponse = await fetch(`${API_URLS.portfolio}?type=portfolio`);
      const portfolioData = await portfolioResponse.json();
      setPortfolioItems(portfolioData.items || []);

      const videosResponse = await fetch(`${API_URLS.portfolio}?type=videos`);
      const videosData = await videosResponse.json();
      setVideos(videosData.videos || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(',')[1];
          
          const response = await fetch(API_URLS.upload, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              file: base64,
              type: file.type,
              folder: 'portfolio'
            })
          });

          const data = await response.json();
          if (data.success) {
            resolve(data.url);
          } else {
            reject(new Error('Upload failed'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioItem.image) {
      toast({ title: 'Ошибка', description: 'Выберите изображение', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await handleImageUpload(newPortfolioItem.image);

      const response = await fetch(API_URLS.portfolio, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'portfolio',
          title: newPortfolioItem.title,
          category: newPortfolioItem.category,
          image_url: imageUrl,
          display_order: portfolioItems.length + 1
        })
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: 'Фото добавлено в портфолио' });
        setNewPortfolioItem({ title: '', category: 'fashion', image: null });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить фото', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URLS.portfolio, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'video',
          title: newVideo.title,
          description: newVideo.description,
          video_url: newVideo.video_url,
          thumbnail_url: null,
          display_order: videos.length + 1
        })
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: 'Видео добавлено' });
        setNewVideo({ title: '', description: '', video_url: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить видео', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, type: string) => {
    try {
      const response = await fetch(`${API_URLS.portfolio}?id=${id}&type=${type}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: 'Элемент удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Админ-панель
            </h1>
            <p className="text-muted-foreground">Войдите для управления портфолио</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary" disabled={loading}>
                {loading ? 'Загрузка...' : 'Войти'}
              </Button>
              <Button type="button" variant="outline" onClick={handleRegister} disabled={loading}>
                Регистрация
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Админ-панель
          </h1>
          <div className="flex gap-4 items-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Home" size={20} className="inline mr-2" />
              На сайт
            </a>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Image" className="text-primary" />
              Добавить фото в портфолио
            </h2>

            <form onSubmit={handleAddPortfolioItem} className="space-y-4">
              <div>
                <Label htmlFor="photo-title">Название</Label>
                <Input
                  id="photo-title"
                  value={newPortfolioItem.title}
                  onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                  placeholder="Studio Editorial"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={newPortfolioItem.category}
                  onValueChange={(value) => setNewPortfolioItem({ ...newPortfolioItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Изображение</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, image: e.target.files?.[0] || null })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary" disabled={loading}>
                {loading ? 'Загрузка...' : 'Добавить фото'}
              </Button>
            </form>

            <div className="mt-8">
              <h3 className="font-bold mb-4">Текущие фото ({portfolioItems.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id, 'portfolio')}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Video" className="text-secondary" />
              Добавить видео
            </h2>

            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <Label htmlFor="video-title">Название</Label>
                <Input
                  id="video-title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Fashion Week 2024"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  placeholder="Показ коллекции весна-лето"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="video-url">URL видео (YouTube, Vimeo)</Label>
                <Input
                  id="video-url"
                  value={newVideo.video_url}
                  onChange={(e) => setNewVideo({ ...newVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-accent" disabled={loading}>
                {loading ? 'Загрузка...' : 'Добавить видео'}
              </Button>
            </form>

            <div className="mt-8">
              <h3 className="font-bold mb-4">Текущие видео ({videos.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded flex items-center justify-center">
                      <Icon name="Play" size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(video.id, 'video')}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
