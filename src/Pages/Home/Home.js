import { Banner } from './Banner';
import { Products } from './Products';
import { Summary } from './Summary';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-evenly gap-20 my-20">
      <Banner />
      <Products />
      <Summary />
    </div>
  );
};

export default Home;
