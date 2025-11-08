import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { HomePage } from "../pages/Home/HomePage";
import { CategoryPage } from "../pages/Category/CategoryPage";
import { ServiceDetailPage } from "../pages/Service/ServiceDetailPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { ForFreelancersPage } from "../pages/Freelancers/ForFreelancersPage";
import { FreelancerDashboard } from "../pages/FreelancerDashboard/FreelancerDashboard";
import { MessagesPage } from "../pages/Messages/MessagesPage";
import { AuthPage } from "../pages/Auth/AuthPage";
import { ServicesPage } from "../pages/Services/ServicesPage";
import { FreelancerListPage } from "../pages/Freelancers/FreelancerListPage";
import { BuyerDashboard } from "../pages/Buyer/BuyerDashboard";

const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <DefaultLayout>{children}</DefaultLayout>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        }
      />
      <Route
        path="/categories"
        element={
          <LandingLayout>
            <CategoryPage />
          </LandingLayout>
        }
      />
      <Route
        path="/category/:slug"
        element={
          <LandingLayout>
            <CategoryPage />
          </LandingLayout>
        }
      />
      <Route
        path="/services"
        element={
          <LandingLayout>
            <ServicesPage />
          </LandingLayout>
        }
      />
      <Route
        path="/service/:slug"
        element={
          <LandingLayout>
            <ServiceDetailPage />
          </LandingLayout>
        }
      />
      <Route
        path="/freelancer/:slug"
        element={
          <LandingLayout>
            <ProfilePage />
          </LandingLayout>
        }
      />
      <Route
        path="/freelancers"
        element={
          <LandingLayout>
            <FreelancerListPage />
          </LandingLayout>
        }
      />
      <Route
        path="/for-freelancers"
        element={
          <LandingLayout>
            <ForFreelancersPage />
          </LandingLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DefaultLayout hideNav>
            <FreelancerDashboard />
          </DefaultLayout>
        }
      />
      <Route
        path="/freelancer/dashboard"
        element={
          <DefaultLayout hideNav>
            <FreelancerDashboard />
          </DefaultLayout>
        }
      />
      <Route
        path="/messages"
        element={
          <LandingLayout>
            <MessagesPage />
          </LandingLayout>
        }
      />
      <Route
        path="/buyer-dashboard"
        element={
          <DefaultLayout hideNav>
            <BuyerDashboard />
          </DefaultLayout>
        }
      />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
    </Routes>
  );
};