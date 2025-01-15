import AddButton from '../../components/AddButton'
import SideBar from '../../containers/SideBar'
import ContactsList from '../../containers/ContactsList'

const Home = () => (
  <>
    <SideBar showFilteredResults />
    <ContactsList />
    <AddButton />
  </>
)

export default Home
