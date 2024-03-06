import { MainLayout } from '../layouts';
import { CharacterCard } from '../components/cards';
import Grid from '../components/grid/Grid';

const Home = () => {
  return (
    <MainLayout>
      <Grid>
        {Array.from(Array(10).keys()).map((index) => (
          <CharacterCard key={index} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
