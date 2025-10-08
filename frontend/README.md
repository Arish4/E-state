# E-State Frontend

A modern React frontend for the E-State real estate platform, built with Vite and integrated with a Node.js/Express backend.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and hover effects
- **Role-based Authentication**: Separate interfaces for buyers and sellers
- **Estate Management**: Full CRUD operations for property listings
- **Search Functionality**: Advanced search with filters
- **Image Upload**: Support for property image uploads
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Form Validation**: Client-side validation with error handling
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error handling and user feedback

## Pages & Components

### Public Pages
- **Home**: Landing page with hero section, features, testimonials, and CTA
- **About**: Company information, mission, values, team, and contact details

### Authentication
- **Login**: User authentication with role selection (buyer/seller)
- **Register**: User registration with form validation

### Estate Management
- **Browse Estates** (Buyers): View all available properties with search
- **My Estates** (Sellers): Manage your property listings
- **Add Estate** (Sellers): Create new property listings
- **Edit Estate** (Sellers): Update existing property information

### Components
- **Navbar**: Responsive navigation with user authentication
- **Footer**: Company information and links
- **AuthContext**: Global authentication state management

## Backend Integration

The frontend automatically integrates with the backend API:

### API Endpoints Used
- `POST /users/login` - User authentication
- `POST /users/register` - User registration
- `GET /estates/all` - Get all estates (buyers)
- `GET /estates/my` - Get user's estates (sellers)
- `POST /estates/upload` - Create new estate
- `PUT /estates/update/:id` - Update estate
- `GET /estates/search` - Search estates

### Authentication
- JWT token-based authentication
- Automatic token storage in localStorage
- Role-based access control (buyer/seller)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 3000

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
The frontend automatically connects to the backend at `http://localhost:3000`. Make sure your backend server is running before starting the frontend.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Navbar.css
│   ├── Footer.jsx
│   └── Footer.css
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Home.css
│   ├── About.jsx
│   ├── About.css
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Auth.css
│   ├── Estates.jsx
│   ├── Estates.css
│   ├── MyEstates.jsx
│   ├── MyEstates.css
│   ├── AddEstate.jsx
│   ├── AddEstate.css
│   ├── EditEstate.jsx
│   └── EditEstate.css
├── services/           # API services
│   └── api.js
├── App.jsx             # Main app component
├── App.css             # Global styles
├── main.jsx            # Entry point
└── index.css           # Base styles
```

## Usage

### For Buyers
1. Register/Login as a buyer
2. Browse available properties on the Estates page
3. Use search functionality to find specific properties
4. View property details and contact sellers

### For Sellers
1. Register/Login as a seller
2. Add new properties via the "Add Estate" page
3. Manage your listings on the "My Estates" page
4. Edit property information as needed
5. Track property status (available/sold)

## Styling

The project uses custom CSS with:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Responsive design with mobile-first approach
- Smooth transitions and hover effects
- Modern gradient backgrounds and shadows

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration included
- Consistent naming conventions
- Component-based architecture
- Separation of concerns (components, styles, services)

## Troubleshooting

### Common Issues
1. **Backend Connection**: Ensure backend is running on port 3000
2. **CORS Issues**: Backend should have CORS enabled
3. **Image Upload**: Check file size limits (5MB max)
4. **Authentication**: Clear localStorage if experiencing auth issues

### Debug Mode
Enable browser developer tools to see:
- Network requests to backend
- Console errors and warnings
- Local storage contents
- Component state changes

## Contributing

1. Follow the existing code style
2. Add appropriate error handling
3. Include responsive design considerations
4. Test on multiple browsers and devices
5. Update documentation as needed

## License

This project is part of the E-State real estate platform.