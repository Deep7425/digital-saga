import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import CursorFollower from "./components/CursorFollower.jsx";
import About from "./pages/About.jsx";
import AdminContacts from "./pages/admin/AdminContacts.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminPortfolios from "./pages/admin/AdminPortfolios.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Services from "./pages/Services.jsx";


function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminContacts} />
        <Route path="/admin/portfolios" component={AdminPortfolios} />
        <Route path="/admin/services" component={AdminServices} />
        <Route component={NotFound} />
      </Switch>
      <CursorFollower/>
    </>
  );
}

function App() {
  return <Router />;
}

export default App;