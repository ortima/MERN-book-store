import Header from "./components/header";
import { BookTable } from "./components/table";
import Layout from "./components/layout";

export const App = () => {
  return (
    <Layout>
      <Header />
      <BookTable />
    </Layout>
  );
};
