import Title from "../components/Title";
import HomeCard from "../components/HomeCard";
import ChangePort from "../components/ChangePort";

const Home = () => {
  return (
    <div className="flex w-full flex-col gap-10 items-center">
      <Title title="Bienvenido a tu taller" svg="/car_repair.svg"></Title>
      <HomeCard
        title="Lista de Precios"
        link="/Prices"
        description="Gestiona los precios"
        badges={["Lista", "Agregar"]}
        svg="/repair.svg"
      ></HomeCard>
      <HomeCard
        title="Vehiculos"
        link="/Cars"
        description="Gestiona tus autos"
        badges={["Lista", "Agregar", "Añadir Bono"]}
        svg="/car.svg"
      ></HomeCard>
      <HomeCard
        title="Reparaciones"
        link="/Reparations"
        description="Gestiona tus reparaciones"
        badges={["Lista", "Agregar"]}
        svg="/repair.svg"
      ></HomeCard>
      <HomeCard
        title="Reportes"
        link="/Reports"
        description="Genera tus reportes"
        badges={[
          "Reporte tipo 1",
          "Reporte tipo 2",
        ]}
        svg="/report.svg"
      ></HomeCard>
      <ChangePort></ChangePort>
    </div>
  );
};

export default Home;
