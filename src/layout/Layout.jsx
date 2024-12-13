import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
export default function Layout({ children }) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
