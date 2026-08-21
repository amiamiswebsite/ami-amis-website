import ServicesPage from "../diensten/ServicesPage";

export const metadata = {
  title: "Diensten backup",
  description:
    "Backup van de vorige Ami Amis dienstenpagina, voorlopig bewaard buiten de hoofdnavigatie.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ServicesPage />;
}
