# Clerk Authentication Setup - PlantRise

## ✅ Setup Complete

Clerk authentication has been successfully integrated into the PlantRise application.

## Features Implemented

### 1. **Authentication Components**
- **Sign In Button** - Modal-based sign-in
- **Sign Up Button** - Modal-based sign-up
- **User Button** - Dropdown with user profile and settings
- **Protected Routes** - Profile page requires authentication

### 2. **User Profile Page** (`/profile`)
A dedicated profile page with:
- User avatar and name display
- Email address
- Member since date
- **Sign Out Button** - Prominent logout functionality
- Protected route (redirects to sign-in if not authenticated)

### 3. **Navigation Integration**
- Desktop: "My Profile" button + UserButton when signed in
- Mobile: "My Profile" link + UserButton in mobile menu
- Sign In/Sign Up buttons when signed out

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with products |
| `/about` | Public | About page |
| `/contact` | Public | Contact form |
| `/faqs` | Public | FAQ section |
| `/product/:id` | Public | Product details |
| `/profile` | **Protected** | User profile with logout |

## Environment Variables

Required in `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Template available in `.env.example`

## Usage

### For Users:
1. Click **"Sign Up"** in the navigation
2. Create an account
3. Access **"My Profile"** to view account details
4. Click **"Sign Out"** button to logout

### For Developers:
```bash
# Start development server
npm run dev

# Access at
http://localhost:8080/
```

## Clerk Dashboard
Manage your application at: https://dashboard.clerk.com/

## Key Files

- `src/App.jsx` - ClerkProvider and protected routes
- `src/components/Navbar.jsx` - Auth buttons and navigation
- `src/pages/Profile.jsx` - User profile with logout button
- `.env` - Environment variables (not committed)
- `.env.example` - Template for environment variables

## Security Notes

- ✅ `.env` is in `.gitignore`
- ✅ Secret key never exposed to client
- ✅ Using `@clerk/clerk-react` (correct package for React)
- ✅ Protected routes redirect to sign-in
- ✅ After sign-out, users are redirected to home page

## Customization

The Clerk appearance is customized in `App.jsx`:
```javascript
appearance={{
  baseTheme: dark,
  variables: {
    colorPrimary: "hsl(142.1 76.2% 36.3%)", // PlantRise green
    colorBackground: "hsl(0 0% 100%)",
    colorText: "hsl(222.2 84% 4.9%)",
  },
}}
```

## Support

- Clerk Documentation: https://clerk.com/docs
- Clerk Components: https://clerk.com/docs/reference/components/overview
- Dashboard: https://dashboard.clerk.com/
