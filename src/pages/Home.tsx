import Header from '../components/Organism/Header'

export default function Home() {
  return (
    <div>Home
      <Header onEdit={() => (console.log('hi'))} onNewTask={() => (console.log('hi'))} />
    </div>
  )
}
