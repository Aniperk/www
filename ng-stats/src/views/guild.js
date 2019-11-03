/** @jsx h */

import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/core'
import { Component, h } from 'preact'

import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'

export default class Guild extends Component {
  state = {
    failed: false,
    data: {}
  }

  componentDidMount() {
    const input = window.location.pathname.split('/')[2]

    fetch(`https://api.nethergames.org/?action=guilds&guild=${input}`)
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(() => this.setState({ failed: true }))
  }

  render() {
    const stats = this.state.data
    const failed = this.state.failed

    if (failed || null === stats) {
      return <Heading color="white">We couldn't find that guild!</Heading>
    }

    if (!stats[0] && !stats.officers) {
      return (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )
    }

    return (
      <div>
        <Helmet>
          <title>{stats.name}</title>
        </Helmet>
        <Box bg="white" borderWidth="1px" overflow="auto" rounded="lg" maxH="75vh" maxW="lg" p="4">
          <Heading>{stats.name}</Heading>
          <Tabs variant="enclosed" pt="4">
            <TabList>
              <Tab>General</Tab>
              <Tab>Officers</Tab>
              <Tab>Members</Tab>
            </TabList>
            <TabPanels pt={4}>
              <TabPanel>
                <Text>Leader: {stats.leader}</Text>
                <Text>Level: {stats.level}</Text>
                <Text>XP: {stats.xp}</Text>
              </TabPanel>
              <TabPanel>
                <List spacing={2}>
                  {stats.officers.map(stat => (
                    <ListItem>
                      <Flex align="center">
                        <Avatar
                          size="sm"
                          src={`https://nethergames.nyc3.digitaloceanspaces.com/avatars/${stat}.png`}
                        />
                        <Box ml="3">
                          <Text fontWeight="bold">
                            <Link as={NavLink} strict exact to={`/player/${stat}`}>
                              {stat}
                            </Link>
                          </Text>
                        </Box>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              <TabPanel>
                <List spacing={2}>
                  {stats.members.map(stat => (
                    <ListItem>
                      <Flex align="center">
                        <Avatar
                          size="sm"
                          src={`https://nethergames.nyc3.digitaloceanspaces.com/avatars/${stat}.png`}
                        />
                        <Box ml="3">
                          <Text fontWeight="bold">
                            <Link as={NavLink} strict exact to={`/player/${stat}`}>
                              {stat}
                            </Link>
                          </Text>
                        </Box>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    )
  }
}
