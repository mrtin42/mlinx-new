export default function Logo() {
  return (
    <a className="flex items-center gap-2" href="/">
      <h1 className="text-2xl font-bold">
        <span className="uppercase">mlinx</span>
        <span> </span>
        <span className="hidden md:inline">reborn.</span>
      </h1>
      <span className="text-sm bg-red-800 text-red-100 px-2 py-1 rounded-lg">
        alpha
      </span>
    </a>
  )
}