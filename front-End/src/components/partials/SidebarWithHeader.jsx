import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'

import {
  FiMenu,
  FiBell
} from 'react-icons/fi'

import { FilterIcon, aceitesIcon, inventoryIcon, clientIcon, pedidoIcon, serviceIcon } from '../icons/Partials.icon.jsx'

import { Outlet, NavLink } from 'react-router-dom'

const LinkItems = [
  { name: 'Aceites', icon: aceitesIcon, to: '/aceites' },
  { name: 'Filtros', icon: FilterIcon, to: '/filtros' },
  { name: 'Clientes', icon: clientIcon, to: '/clientes' },
  { name: 'Pedidos', icon: pedidoIcon, to: '/pedidos' },
  { name: 'Visualizar inventario', icon: inventoryIcon, to: '/inventario' },
  { name: 'Visualizar servicios de lavado', icon: serviceIcon, to: '/servicios' },
  { name: 'Visualizar pedidos', icon: pedidoIcon, to: '/visualizar-pedidos' }
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg='background.bg'
      borderRight='1px'
      borderRightColor='background.border'
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      color='text.87'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <NavLink to='/'>
          <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
            HOME
          </Text>
        </NavLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <NavLink to={to}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        color='text.87'
        _hover={{
          bg: 'primary.100',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            color='white'
            _groupHover={{
              color: '#ffffff'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg='background.bg'
      color='text.87'
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} />
        <Flex alignItems='center'>
          <HStack>
            <Avatar
              size='sm'
              src='https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems='flex-start'
              spacing='1px'
              ml='2'
            >
              <Text fontSize='sm'>Administrador Cuenta</Text>
              <Text fontSize='xs' color='text.87'>
                Admin
              </Text>
            </VStack>
          </HStack>

        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH='100vh' bg='background.panel' color='text.87'>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {/* Content */}
        <Outlet />
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
