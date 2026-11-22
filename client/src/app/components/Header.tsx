import Logo from '../../shared/ui/Logo'

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-center border-b border-(--border) bg-(--bg) px-4">
        <Logo />
    </header>
  )
}

export default Header