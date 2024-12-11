import { formatDistance } from "date-fns";
import { tr } from "date-fns/locale";
import Layout from "./layout/Layout";
import Hero from "./layout/Hero";
function App() {
  const daysLeft = formatDistance(new Date(2025, 0, 6), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

export default App;
