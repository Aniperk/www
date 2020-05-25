/** @jsx h */

import {
	Accordion,
	AccordionHeader,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Avatar,
	AvatarBadge,
	Badge,
	Box,
	Flex,
	Heading,
	Icon,
	Spinner,
	Text,
} from "@chakra-ui/core"
import { Component, h } from "preact"

import { API_HOST } from "../config"
import { Helmet } from "react-helmet"
import Tooltip from "@material-ui/core/Tooltip"

export default class Player extends Component {
	state = {
		failed: false,
		data: {},
	}

	componentDidMount() {
		const input = window.location.pathname.split("/")[2]

		fetch(`${API_HOST}/players/${encodeURIComponent(input)}/stats`)
			.then((res) => res.json())
			.then((res) => this.setState({ data: res }))
			.catch(() => this.setState({ failed: true }))
	}

	render() {
		const stats = this.state.data
		const failed = this.state.failed

		if (failed || null === stats || {} === stats || stats.error) {
			return <Heading color="white">We couldn't find that player!</Heading>
		}

		if (!stats.winsData && !stats.factionsData && !stats.rankColors) {
			return (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			)
		}

		return (
			<div>
				<Helmet>
					<title>{stats.name}</title>
					<meta property="og:site_name" content="NetherGames Network" />
					<meta
						property="og:title"
						content={`${stats.name} - Player Statistics`}
					/>
					<meta property="og:type" content="profile" />
					<meta
						property="og:url"
						content={`https://portal.nethergames.org/player/${stats.name}`}
					/>
					<meta
						property="og:image"
						content={`https://player.nethergames.org/avatar/${stats.name}`}
					/>
					<meta property="og:profile:username" content={stats.name} />
					<meta
						property="og:description"
						content={`Kills: ${stats.kills} | Deaths: ${stats.deaths} | Wins: ${stats.wins} | Level: ${stats.level} | Credits: ${stats.statusCredits}`}
					/>
				</Helmet>
				<Box
					bg="gray.900"
					borderWidth="1px"
					overflow="auto"
					rounded="lg"
					minH="m"
					maxW="lg"
					p="4"
				>
					<Flex>
						<Avatar src={`https://player.nethergames.org/avatar/${stats.name}`}>
							{0 !== stats.voted && (
								<Tooltip title="Voted">
									<AvatarBadge
										as={Icon}
										name="check-circle"
										size="1.25em"
										color="white"
										borderColor="transparent"
									/>
								</Tooltip>
							)}
						</Avatar>
						<Box ml="3">
							<Box fontWeight="bold">
								{stats.name}
								{stats.tierColors.hasOwnProperty("Bronze") && (
									<Badge backgroundColor="#b84e00" color="#fff" ml="1">
										Bronze
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Silver") && (
									<Badge backgroundColor="#777" color="#fff" ml="1">
										Silver
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Gold") && (
									<Badge backgroundColor="#f79500" color="#fff" ml="1">
										Gold
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Ruby") && (
									<Badge backgroundColor="#ff0024" color="#fff" ml="1">
										Ruby
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Diamond") && (
									<Badge backgroundColor="#00c5e5" color="#fff" ml="1">
										Diamond
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Sapphire") && (
									<Badge backgroundColor="#3b37e8" color="#fff" ml="1">
										Sapphire
									</Badge>
								)}
								{stats.tierColors.hasOwnProperty("Platinum") && (
									<Badge backgroundColor="#777" color="#fff" ml="1">
										Platinum
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Owner") && (
									<Badge backgroundColor="#ff0024" color="#fff" ml="1">
										Owner
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Dev") && (
									<Badge backgroundColor="#ff0041" color="#fff" ml="1">
										Dev
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Director") && (
									<Badge backgroundColor="#00cc62" color="#fff" ml="1">
										Director
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Advisor") && (
									<Badge backgroundColor="#ff0024" color="#fff" ml="1">
										Advisor
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Commmunity") && (
									<Badge backgroundColor="#ff009b" color="#fff" ml="1">
										Community
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Admin") && (
									<Badge backgroundColor="#ffac1a" color="#fff" ml="1">
										Admin
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Supervisor") && (
									<Badge backgroundColor="#ff00ba" color="#fff" ml="1">
										Supervisor
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Discord") && (
									<Badge backgroundColor="#1abc9c" color="#fff" ml="1">
										Discord
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Support") && (
									<Badge backgroundColor="#b66ae0" color="#fff" ml="1">
										Support
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Mod") && (
									<Badge backgroundColor="#00c5e5" color="#fff" ml="1">
										Mod
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Crew") && (
									<Badge backgroundColor="#00cc62" color="#fff" ml="1">
										Crew
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Trainee") && (
									<Badge backgroundColor="#ffab1c" color="#fff" ml="1">
										Trainee
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Builder") && (
									<Badge backgroundColor="#0092e2" color="#fff" ml="1">
										Builder
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Artist") && (
									<Badge backgroundColor="#9b59b6" color="#fff" ml="1">
										Artist
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Legend") && (
									<Badge backgroundColor="#00c5e5" color="#fff" ml="1">
										Legend
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Emerald") && (
									<Badge backgroundColor="#00cc62" color="#fff" ml="1">
										Emerald
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Ultra") && (
									<Badge backgroundColor="#f79500" color="#fff" ml="1">
										Ultra
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("Partner") && (
									<Badge backgroundColor="#ff4f00" color="#fff" ml="1">
										Partner
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("YouTube") && (
									<Badge backgroundColor="#ff0024" color="#fff" ml="1">
										YouTube
									</Badge>
								)}
								{stats.rankColors.hasOwnProperty("YT") && (
									<Badge backgroundColor="#006e96" color="#fff" ml="1">
										YT
									</Badge>
								)}
							</Box>
							<Text fontSize="m">
								{Math.round((stats.kills / stats.deaths) * 100) / 100} k/d ratio
							</Text>
						</Box>
					</Flex>
					<Flex pt="4" pb="2">
						<Text fontSize="m">
							{stats.kills} kills · {stats.deaths} deaths · {stats.wins} wins ·{" "}
							{stats.level} levels · {stats.statusCredits} credits
						</Text>
					</Flex>
					<Flex pb="4">
						<Text fontSize="lg">
							<Icon name="view" /> Last seen{" "}
							{stats.online ? "right now" : `${stats.lastSeen} ago`} on{" "}
							{stats.lastServer}
						</Text>
					</Flex>
					<Accordion allowToggle>
						{stats.bio !== undefined && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Biography
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>{stats.bio}</AccordionPanel>
							</AccordionItem>
						)}
						{stats.winsData[0] !== undefined && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Wins Summary
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>
									{stats.winsData[0].BR > 0 && (
										<Text>Battle Royale: {stats.winsData[0].BR}</Text>
									)}
									{stats.winsData[0].BW > 0 && (
										<Text>Bedwars: {stats.winsData[0].BW}</Text>
									)}
									{stats.winsData[0].BH > 0 && (
										<Text>Block Hunt: {stats.winsData[0].BH}</Text>
									)}
									{stats.winsData[0].BB > 0 && (
										<Text>Build Battle: {stats.winsData[0].BB}</Text>
									)}
									{stats.winsData[0].CTF > 0 && (
										<Text>Capture the Flag: {stats.winsData[0].CTF}</Text>
									)}
									{stats.winsData[0].Duels > 0 && (
										<Text>Duels: {stats.winsData[0].Duels}</Text>
									)}
									{stats.winsData[0].MM > 0 && (
										<Text>Murder Mystery: {stats.winsData[0].MM}</Text>
									)}
									{stats.winsData[0].RC > 0 && (
										<Text>Races: {stats.winsData[0].RC}</Text>
									)}
									{stats.winsData[0].SC > 0 && (
										<Text>Soccer: {stats.winsData[0].SC}</Text>
									)}
									{stats.winsData[0].SW > 0 && (
										<Text>SkyWars: {stats.winsData[0].SW}</Text>
									)}
									{stats.winsData[0].SG > 0 && (
										<Text>Survival Games: {stats.winsData[0].SG}</Text>
									)}
									{stats.winsData[0].TR > 0 && (
										<Text>TNT Run: {stats.winsData[0].TR}</Text>
									)}
								</AccordionPanel>
							</AccordionItem>
						)}
						{stats.factionsData[0] !== undefined && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Factions Statistics
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>
									<Text>Bounty: {stats.factionsData[0].bounty}</Text>
									<Text>Coins: {stats.factionsData[0].coins}</Text>
									<Text>Join date: {stats.factionsData[0].registerDate}</Text>
									<Text>Kills: {stats.factionsData[0].kills}</Text>
									<Text>Power: {stats.factionsData[0].power}</Text>
									<Text>Success Rate: {stats.factionsData[0].successRate}</Text>
								</AccordionPanel>
							</AccordionItem>
						)}
					</Accordion>
				</Box>
			</div>
		)
	}
}
