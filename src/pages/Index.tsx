import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    { id: 1, category: 'fashion', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/6e539968-6a0a-4234-88df-11d4653e11c8.jpg', title: 'Studio Editorial' },
    { id: 2, category: 'outdoor', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/af92bad2-5921-4b2e-bc16-e4b2c3483b5d.jpg', title: 'Natural Light' },
    { id: 3, category: 'beauty', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/2480b63e-661d-4193-86a0-b4fcee3e605a.jpg', title: 'Beauty Shot' },
    { id: 4, category: 'fashion', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/6e539968-6a0a-4234-88df-11d4653e11c8.jpg', title: 'High Fashion' },
    { id: 5, category: 'outdoor', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/af92bad2-5921-4b2e-bc16-e4b2c3483b5d.jpg', title: 'Lifestyle' },
    { id: 6, category: 'beauty', image: 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/2480b63e-661d-4193-86a0-b4fcee3e605a.jpg', title: 'Portrait' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              LOOKBOOK
            </h1>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('profile')} className="text-sm font-medium hover:text-primary transition-colors">Профиль</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-sm font-medium hover:text-primary transition-colors">Портфолио</button>
              <button onClick={() => scrollToSection('videos')} className="text-sm font-medium hover:text-primary transition-colors">Видео</button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Скачать PDF
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">Профессиональная модель</Badge>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Анастасия<br />Волкова
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Опыт работы с ведущими брендами и фотографами
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Mail" className="mr-2" size={20} />
                  Связаться
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Download" className="mr-2" size={20} />
                  Портфолио
                </Button>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Twitter" size={24} />
                </a>
              </div>
            </div>
            <div className="animate-scale-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-30"></div>
                <img 
                  src="https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/6e539968-6a0a-4234-88df-11d4653e11c8.jpg" 
                  alt="Анастасия Волкова" 
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="profile" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Профиль модели
          </h2>
          <p className="text-center text-muted-foreground mb-12">Детальная информация для работодателей</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 animate-slide-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl">
                  <Icon name="Ruler" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Параметры</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Рост:</span>
                  <span className="font-semibold text-foreground">178 см</span>
                </div>
                <div className="flex justify-between">
                  <span>Обхват груди:</span>
                  <span className="font-semibold text-foreground">86 см</span>
                </div>
                <div className="flex justify-between">
                  <span>Обхват талии:</span>
                  <span className="font-semibold text-foreground">62 см</span>
                </div>
                <div className="flex justify-between">
                  <span>Обхват бедер:</span>
                  <span className="font-semibold text-foreground">92 см</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/50 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-secondary to-accent rounded-2xl">
                  <Icon name="Shirt" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Размеры</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Одежда:</span>
                  <span className="font-semibold text-foreground">42-44 (RU)</span>
                </div>
                <div className="flex justify-between">
                  <span>Обувь:</span>
                  <span className="font-semibold text-foreground">38 (EU)</span>
                </div>
                <div className="flex justify-between">
                  <span>Платье:</span>
                  <span className="font-semibold text-foreground">S-M</span>
                </div>
                <div className="flex justify-between">
                  <span>Джинсы:</span>
                  <span className="font-semibold text-foreground">W26-27</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-2xl">
                  <Icon name="Info" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Детали</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Цвет волос:</span>
                  <span className="font-semibold text-foreground">Светло-русый</span>
                </div>
                <div className="flex justify-between">
                  <span>Цвет глаз:</span>
                  <span className="font-semibold text-foreground">Голубые</span>
                </div>
                <div className="flex justify-between">
                  <span>Возраст:</span>
                  <span className="font-semibold text-foreground">24 года</span>
                </div>
                <div className="flex justify-between">
                  <span>Опыт:</span>
                  <span className="font-semibold text-foreground">5+ лет</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Icon name="Award" size={28} className="text-primary" />
                Специализация
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-gradient-to-r from-primary to-secondary">Fashion Editorial</Badge>
                <Badge className="bg-gradient-to-r from-secondary to-accent">Commercial</Badge>
                <Badge className="bg-gradient-to-r from-accent to-primary">Beauty</Badge>
                <Badge className="bg-gradient-to-r from-primary to-secondary">Runway</Badge>
                <Badge className="bg-gradient-to-r from-secondary to-accent">E-commerce</Badge>
                <Badge className="bg-gradient-to-r from-accent to-primary">Lifestyle</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Портфолио
          </h2>
          <p className="text-center text-muted-foreground mb-12">Избранные работы и фотосессии</p>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <Button 
              onClick={() => setActiveFilter('all')}
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className={activeFilter === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              Все работы
            </Button>
            <Button 
              onClick={() => setActiveFilter('fashion')}
              variant={activeFilter === 'fashion' ? 'default' : 'outline'}
              className={activeFilter === 'fashion' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              Fashion
            </Button>
            <Button 
              onClick={() => setActiveFilter('outdoor')}
              variant={activeFilter === 'outdoor' ? 'default' : 'outline'}
              className={activeFilter === 'outdoor' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              Outdoor
            </Button>
            <Button 
              onClick={() => setActiveFilter('beauty')}
              variant={activeFilter === 'beauty' ? 'default' : 'outline'}
              className={activeFilter === 'beauty' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              Beauty
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <Badge className="bg-white/20 backdrop-blur-sm">{item.category}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Видео
          </h2>
          <p className="text-center text-muted-foreground mb-12">Видео-портфолио и съемки</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-10"></div>
                <Icon name="Play" size={64} className="text-primary group-hover:scale-110 transition-transform relative z-10" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Fashion Week 2024</h3>
                <p className="text-muted-foreground">Показ коллекции весна-лето</p>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-10"></div>
                <Icon name="Play" size={64} className="text-secondary group-hover:scale-110 transition-transform relative z-10" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Behind the Scenes</h3>
                <p className="text-muted-foreground">Закулисье фотосессии</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Контакты
          </h2>
          <p className="text-center text-muted-foreground mb-12">Свяжитесь для сотрудничества</p>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:contact@model.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@model.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-secondary to-accent rounded-xl">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <a href="tel:+79001234567" className="text-muted-foreground hover:text-primary transition-colors">
                      +7 (900) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-xl">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Локация</h3>
                    <p className="text-muted-foreground">Москва, Россия</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-xl">Социальные сети</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all group">
                    <Icon name="Instagram" size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">@anastasia.volkova</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-secondary/10 hover:to-accent/10 transition-all group">
                    <Icon name="Facebook" size={24} className="text-muted-foreground group-hover:text-secondary transition-colors" />
                    <span className="font-medium">Анастасия Волкова</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all group">
                    <Icon name="Linkedin" size={24} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    <span className="font-medium">Anastasia Volkova</span>
                  </a>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90" size="lg">
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать визитку
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 bg-white/80 backdrop-blur-lg border-t border-purple-100">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Анастасия Волкова. Все права защищены.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Facebook" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Twitter" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Linkedin" size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
