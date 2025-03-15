// import Header from "./components/Header";
import Layout from "./components/Layout";
import useFetchData from "./hooks/useFetchData";
import "./App.scss";

function App() {
  useFetchData();
  return <Layout />;
}

export default App;
