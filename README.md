# 🚀 Creative Developer Portfolio

A stunning, modern portfolio website featuring advanced animations, 3D interactions, and cutting-edge web technologies. Built with React, GSAP, Three.js, and Tailwind CSS.

## ✨ Features

### 🎬 Advanced Animations
- **GSAP ScrollTrigger**: Scroll-based animations throughout the site
- **Split Text Animations**: Character, word, and line-based text reveals
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience
- **Custom Cursor**: Interactive cursor with hover effects
- **Scroll Progress**: Visual progress indicator

### 🎨 Visual Excellence
- **3D Interactive Elements**: Three.js powered 3D scenes
- **Particle Systems**: Dynamic background animations
- **Gradient Animations**: Smooth color transitions
- **Glass Morphism**: Modern UI design elements
- **Responsive Design**: Perfect on all devices

### 🎯 Interactive Sections

1. **Hero Section** - Full-screen intro with animated text and parallax
2. **3D Landing** - Interactive 3D sphere with scroll-controlled animations
3. **About Section** - Pinned image with scrolling content
4. **Projects Showcase** - Horizontal scroll with snap cards and modals
5. **Skills Timeline** - Vertical timeline with alternating animations
6. **Image Gallery** - Masonry layout with zoom effects and filtering
7. **Contact Form** - Interactive form with particle background

### 🌙 Theme System
- **Dark/Light Mode**: Smooth animated theme transitions
- **System Preference**: Respects user's OS theme preference
- **Persistent Storage**: Remembers theme choice

### ⚡ Performance
- **Optimized Animations**: 60fps smooth animations
- **Lazy Loading**: Efficient resource loading
- **Code Splitting**: Optimized bundle sizes
- **SEO Friendly**: Meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Animations**: GSAP, ScrollTrigger, Lenis
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS, Custom CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── AboutSection.jsx     # About section with pinned image
│   ├── AnimatedNavbar.jsx   # Navigation with scroll highlights
│   ├── ContactSection.jsx   # Contact form with particles
│   ├── CustomCursor.jsx     # Custom cursor implementation
│   ├── HeroSection.jsx      # Hero section with animations
│   ├── ImageGallery.jsx     # Masonry gallery with filters
│   ├── Preloader.jsx        # Loading screen animation
│   ├── ProjectsSection.jsx  # Horizontal project showcase
│   ├── ScrollProgress.jsx   # Scroll progress indicator
│   ├── SkillsTimeline.jsx   # Animated timeline
│   ├── SplitTextAnimation.jsx # Text animation utilities
│   └── ThreeDLanding.jsx    # 3D interactive section
├── hooks/               # Custom React hooks
│   ├── useLenis.js         # Smooth scrolling hook
│   └── useTheme.js         # Theme management hook
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and utilities
```

## 🎨 Customization

### Colors & Themes
Update the color scheme in `src/index.css`:
```css
:root {
  --primary-purple: #8B5CF6;
  --primary-pink: #EC4899;
  --primary-blue: #3B82F6;
}
```

### Content
- **Personal Info**: Update content in each section component
- **Projects**: Modify the projects array in `ProjectsSection.jsx`
- **Skills**: Update the experiences array in `SkillsTimeline.jsx`
- **Gallery**: Add your images to the images array in `ImageGallery.jsx`

### Animations
- **GSAP Timelines**: Customize animations in component `useEffect` hooks
- **3D Elements**: Modify Three.js components in `ThreeDLanding.jsx`
- **Text Animations**: Use different animation types in `SplitTextAnimation.jsx`

## 🎯 Animation Types

### Text Animations
```jsx
import { FadeUpText, WaveText, GlitchText } from './components/SplitTextAnimation';

<FadeUpText className="text-4xl font-bold">
  Animated Text
</FadeUpText>
```

### Scroll Animations
```jsx
ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  animation: gsap.from(element, { y: 50, opacity: 0 })
});
```

### 3D Interactions
```jsx
<Canvas>
  <AnimatedSphere />
  <FloatingParticles />
  <OrbitControls />
</Canvas>
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Lazy Loading**: Implement for heavy 3D scenes
3. **Animation Performance**: Use `will-change` CSS property
4. **Bundle Analysis**: Run `npm run build -- --analyze`

## 🔧 Configuration

### Vite Config
Customize build settings in `vite.config.js`

### Tailwind Config  
Extend theme in `tailwind.config.js`

### GSAP Plugins
Register additional plugins in component files:
```javascript
import { ScrollTrigger, TextPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, TextPlugin);
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🎨 Design Credits

- **Animations**: Inspired by modern web design trends
- **3D Elements**: Three.js community examples
- **Color Palette**: Modern gradient combinations
- **Typography**: Inter font family

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing the portfolio:

- 📧 Email: support@portfolio.com
- 💬 Discord: [Join our community]
- 📚 Documentation: [Full docs]

## 🌟 Showcase

Built with ❤️ using modern web technologies. Perfect for:
- **Developers** showcasing their skills
- **Designers** displaying their portfolio
- **Agencies** presenting their work
- **Freelancers** attracting clients

---

**Made with 💜 by [Your Name]**

*Crafting digital experiences with passion, precision, and a touch of magic.*