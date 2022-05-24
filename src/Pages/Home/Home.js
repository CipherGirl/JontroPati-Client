import { Banner } from './Banner';
import { LatestProducts } from './LatestProducts';
import { Summary } from './Summary';
import { Reviews } from './Reviews';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-evenly gap-20 md:gap-52 my-2 md:my-32">
      <Banner />
      <LatestProducts />
      <Summary />
      <Reviews />
    </div>
  );
};

export default Home;
