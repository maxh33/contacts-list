import AddButton from '../../components/AddButton'
import SideBar from '../../containers/SideBar'
import TasksList from '../../containers/TasksList'

const Home = () => (
  <>
    <SideBar showFilteredResults />
    <TasksList />
    <AddButton />
  </>
)

export default Home
