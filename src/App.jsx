import { formatDistance } from "date-fns";
import { tr } from "date-fns/locale";
import Layout from "./layout/Layout";
import Hero from "./layout/Hero";
import SignupForm from "./pages/SignupForm";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  const daysLeft = formatDistance(new Date(2025, 0, 6), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <Layout>
      <Switch>
        <Hero path exact="/" component={Hero} />
      </Switch>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
      <Switch>
        <SignupForm path="/signup" component={SignupForm} />
      </Switch>
    </Layout>
  );
}

export default App;
