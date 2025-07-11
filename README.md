# FTown Manager

A modern web application for managing FTown operations built with Next.js 14, TypeScript, and Material-UI.

## 🌟 Features

- 📊 Dashboard for real-time monitoring
- 👥 Staff management system
- 📦 Inventory tracking and management
- 🛍️ Order processing and management
- 📊 Data visualization with charts
- 🌓 Dark/Light theme support
- 🔐 Authentication and authorization
- 📱 Responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** 
  - Tailwind CSS
  - Material-UI (MUI)
  - Emotion
- **State Management:** React Context
- **Charts:** Chart.js, Recharts
- **UI Components:**
  - HeadlessUI
  - Framer Motion
  - Swiper
  - Ant Design
- **Form Handling:** React Hook Form
- **API Client:** Axios
- **Payment Integration:** PayOS Checkout
- **Development Tools:**
  - ESLint
  - PostCSS
  - TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ftown-manager.git
cd ftown-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:1212`

## 📁 Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # Reusable components
├── context/      # React Context providers
├── db/          # Database configurations
├── hooks/       # Custom React hooks
├── layout/      # Layout components
├── server-actions/ # Server-side actions
├── type/        # TypeScript type definitions
├── ultis/       # Utility functions
└── vendor/      # Third-party integrations
```

## 🔒 API Configuration

The application supports both local and production API endpoints:

- Local API: `https://localhost:7261/api/`
- Shop Manager API: `https://localhost:7000/api/`

## 🎨 Features and Customization

- **Theme Support:** Built-in dark/light theme support using `next-themes`
- **Custom Fonts:** Uses Inter font from Google Fonts
- **Image Optimization:** Configured for Cloudinary and other image sources
- **Data Grid:** Premium MUI Data Grid for advanced table features
- **Charts and Visualizations:** Multiple chart libraries for data visualization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is proprietary and confidential.

## 👥 Contact

For any inquiries, please reach out to the development team.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.