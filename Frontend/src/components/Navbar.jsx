import { Link } from "react-router"
import {PlusIcon} from "lucide-react"

const Navbar = () => {
  return (
    <>
    <header className='bg-purple-500 border-b border-base-content/10 '>
      <div className='mx-auto max-w-6xl p-4'>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary cursor-pointer font-mono tracking-tight text-[#00FF9D]">
            NoteBuddy
          </h1>
          <div className="bg-[#00FF9D] rounded-lg gap-4">
            <Link to={"/create"} className="p-3 flex items-center justify-center">
             <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Navbar