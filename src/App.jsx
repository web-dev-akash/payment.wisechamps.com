import { useRef, useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import "animate.css";
import voucher from "./assets/voucher.PNG";
import { useEffect } from "react";
import { Header } from "./components/Header";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Tag,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Marquee from "react-fast-marquee";

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [mode, setMode] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState({});
  const ref = useRef(null);
  const refSchedule = useRef(null);

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangeAmount = (e) => {
    const amount = Number(e.target.value);
    setAmount(amount);
  };

  const handleClick = async (emailParam) => {
    if (!emailRegex.test(emailParam)) {
      alert("Please Enter a Valid Email");
      window.location.reload();
      return;
    }
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.com/user`;
      const res = await axios.post(url, { email: emailParam });
      const mode = res.data.mode;
      if (mode === "user") {
        setUser(res.data.user);
      }
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handlePayment = async (emailParam, amountParam) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.com/payment_links`;
      const res = await axios.post(url, {
        email: emailParam,
        amount: amountParam,
      });
      setMode("payment");
      const paymentLink = res.data.short_url;
      window.location.assign(paymentLink);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleBonusBtnClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScheduleBtnClick = () => {
    refSchedule.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
  }, []);

  if (loading) {
    return (
      <Box
        overflow={"hidden"}
        width={"95%"}
        height={["80vh", "80vh", "98vh", "98vh"]}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={2}
        margin={"0 auto"}
      >
        <p style={{ fontSize: "18px" }}>
          {mode !== "user"
            ? "Searching best offers for you.."
            : "Generating Your Payment Link.."}
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </Box>
    );
  }

  if (mode === "payment") {
    return (
      <Box
        overflow={"hidden"}
        width={"95%"}
        height={["80vh", "80vh", "98vh", "98vh"]}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={2}
        margin={"0 auto"}
      >
        <p style={{ fontSize: "18px" }}>Generating Your Payment Link..</p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </Box>
    );
  }

  if (mode === "user") {
    return (
      <>
        <Box
          position={"absolute"}
          top={0}
          left={0}
          margin={0}
          padding={0}
          width={"100%"}
        >
          <Marquee>
            <Tag borderRadius={"0"} colorScheme="red">
              Important Note: Your quiz balance is deducted only if you attend a
              quiz and it is not deducted if you skip any sessions.
            </Tag>
            <Tag borderRadius={"0"} colorScheme="whatsapp">
              Your remaining quiz balance will be carried forward to the next
              grade / class after this academic session ends
            </Tag>
            <Tag borderRadius={"0"} colorScheme="red">
              Important Note: Your quiz balance is deducted only if you attend a
              quiz and it is not deducted if you skip any sessions.
            </Tag>
            <Tag borderRadius={"0"} colorScheme="whatsapp">
              Your remaining quiz balance will be carried forward to the next
              grade / class after this academic session ends
            </Tag>
          </Marquee>
        </Box>
        <Header />
        <Box
          position={"absolute"}
          top={"25px"}
          right={["20px", "20px", "30px", "30px"]}
        >
          <Button
            border={"1px solid #4e47e5"}
            background={"none"}
            color="#4e47e5"
            width={"unset"}
            height={"unset"}
            padding={"2px 8px"}
            margin={"15px 0"}
            fontSize={["12px", "12px", "12px", "12px", "14px"]}
            onClick={() =>
              window.open(`https://students.wisechamps.com?email=${email}`)
            }
          >
            Dashboard
          </Button>
        </Box>

        <Box
          pt={["75px", "75px", "75px", "80px"]}
          width={["100%", "100%", "95%", "95%"]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={["column", "column", "row", "row"]}
          gap={[4, 4, 0, 0]}
          margin={"0 auto"}
        >
          <Text
            fontSize={"15px"}
            fontWeight={"600"}
            bg={"transparent"}
            color={"#4F47E4"}
            border={"1px solid #4F47E4"}
            borderRadius={"8px"}
            display={"flex"}
            justifyContent={"center"}
            textAlign={"center"}
            alignItems={"center"}
            padding={"10px 2rem"}
            width={["95%", "95%", "unset", "unset"]}
          >
            Welcome {user.studentName || "Parents"}
          </Text>
          <Tag
            fontWeight={"600"}
            bg={"transparent"}
            color={"#4F47E4"}
            border={"1px solid #4F47E4"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"10px 2rem"}
            width={["95%", "95%", "unset", "unset"]}
            fontSize={"15px"}
          >
            Your Quiz Balance : {user.credits ? user.credits : "0"}
          </Tag>
        </Box>
        <Box
          minHeight={["auto", "auto", "80vh", "75vh"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box
            margin={"20px auto"}
            width={"95%"}
            display={"grid"}
            placeItems={"center"}
            gridTemplateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={5}
            maxWidth={["500px", "500px", "1000px", "1100px", "1500px"]}
          >
            {/* <Box
              border={"1px solid red"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Box
                marginBottom={["0px", "0px", "10px", "10px"]}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={["flex-start", "flex-start", "center", "center"]}
                flexDir={["column", "column", "row", "row"]}
              >
                <Text
                  fontSize={["18px", "18px", "18px", "20px"]}
                  fontWeight={700}
                >
                  Free Balance
                </Text>
                <Tag
                  colorScheme="whatsapp"
                  margin={["5px 0", "5px 0", "", ""]}
                  size={["sm", "sm", "md", "sm", "md"]}
                >
                  Most Popular
                </Tag>
              </Box>
              <Text
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
              >
                ₹0{" "}
                <Text as={"span"} fontSize={"15px"}>
                  /5 Quiz
                </Text>
              </Text>
              <Text
                fontSize={["12px", "12px", "15px", "12px", "15px"]}
                marginBottom={["10px", "10px", "0", "0"]}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                Exciting News! No need to pay at all! Attend sessions for free!
                How?
              </Text>
              <Accordion
                allowToggle
                display={["block", "block", "none", "none"]}
                border={"1px solid #a4b5fc"}
                borderRadius={"10px"}
                outline={"none"}
              >
                <AccordionItem border={"none"} borderRadius={"10px"}>
                  <h2
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionButton borderRadius={"10px"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        borderRadius={"10px"}
                      >
                        Steps to get Free Quizzes
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    borderRadius={"10px"}
                    marginTop={"10px"}
                  >
                    <List>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        Call your cousin or friend and ask them to enjoy free
                        final exam practice sessions with Wisechamps.
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        Send them the joining link by clicking on the button
                        below.
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        As soon as he/she joins, you both get 5 quiz balance
                        free!
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />
                        <b>
                          Validity : Use this quiz balance anytime in the next 3
                          years
                        </b>
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Box>
                <Button
                  border={"none"}
                  background={"none"}
                  color="#4e47e5"
                  padding={0}
                  width={"unset"}
                  height={"unset"}
                  margin={"15px 0"}
                  fontSize={["12px", "12px", "14px", "12px", "14px"]}
                  textDecoration={"underline"}
                  onClick={handleBonusBtnClick}
                >
                  Know more about Bonus
                </Button>
              </Box>
              <Button
                width={"100%"}
                background={"#4E47E5"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                onClick={() =>
                  (window.location.href = `https://wa.me?text=Hi!%20I%20am%20learning%20a%20lot%20through%20Wisechamps%20Final%20Exam%20Practice%20Sessions.%20These%20quizzes%20are%20FUN%20%26%20INTERESTING%20way%20of%20LEARNING%20regularly.%20%0A%0AI%20am%20sure%20this%20time%20I%20will%20Ace%20my%20final%20Math%20and%20Science%20Exams.%0A%0AWinners%20also%20get%20gifts!%20So%20Don%27t%20Miss%20out...%0A%0AClick%20here%20to%20register%20your%20name%20and%20participate%20in%20free%20sessions%20%F0%9F%91%87%0Ahttps%3A%2F%2Freferral.wisechamps.com%3FrefereeId%3D${user.phone}%20%0A%0ASee%20you%20there%20%F0%9F%92%A1`)
                }
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #4E47E5",
                  boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
                }}
                marginBottom={["0", "0", "25px", "25px"]}
              >
                Invite a Cousin / Friend
              </Button>

              <List display={["none", "none", "block", "block"]}>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> Call
                  your cousin or friend and ask them to enjoy free final exam
                  practice sessions with Wisechamps.
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> Send
                  them the joining link by clicking on the button.
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> As
                  soon as he/she joins, you both get 5 quiz balance free!
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />
                  <b>
                    Validity : Use this quiz balance anytime in the next 3 years
                  </b>
                </ListItem>
              </List>
            </Box> */}
            <Box
              border={"1px solid #ccc"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Text
                fontSize={["18px", "18px", "18px", "20px"]}
                fontWeight={700}
                marginBottom={["0px", "0px", "10px", "10px"]}
              >
                Trial Package
              </Text>
              <Text
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
              >
                ₹199{" "}
                <Text as={"span"} fontSize={"15px"}>
                  /5 Quiz
                </Text>
              </Text>
              <Text
                fontSize={["12px", "12px", "15px", "12px", "15px"]}
                marginBottom={["10px", "10px", "25px", "25px"]}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                Click on the button below to Pay ₹199 for 5 quizzes{" "}
                <Tag size={"sm"} colorScheme="purple">
                  <b>(Only ₹40 per quiz)</b>
                </Tag>
              </Text>
              <Accordion
                allowToggle
                display={["block", "block", "none", "none"]}
                border={"1px solid #a4b5fc"}
                borderRadius={"10px"}
                outline={"none"}
                marginBottom={["15px", "15px", "35px", "35px"]}
              >
                <AccordionItem border={"none"} borderRadius={"10px"}>
                  <h2
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionButton borderRadius={"10px"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        borderRadius={"10px"}
                      >
                        Benefits
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    borderRadius={"10px"}
                    marginTop={"10px"}
                  >
                    <List>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>5 Quizzes (₹40 per quiz)</b>
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>
                          Validity : Use this quiz balance anytime in the next
                          30 Days
                        </b>
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Button
                width={"100%"}
                background={"#4E47E5"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #4E47E5",
                  boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
                }}
                marginBottom={["0", "0", "25px", "25px"]}
                onClick={() => handlePayment(email, "199")}
              >
                Click to Add Quiz Balance
              </Button>

              <List display={["none", "none", "block", "block"]}>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>5 Quizzes (₹40 per quiz)</b>
                </ListItem>

                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>
                    Validity : Use this quiz balance anytime in the next 30 Days
                  </b>
                </ListItem>
              </List>
            </Box>
            <Box
              border={"1px solid #ccc"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Text
                fontSize={["18px", "18px", "18px", "20px"]}
                fontWeight={700}
                marginBottom={["0px", "0px", "10px", "10px"]}
              >
                Academic Advancement
              </Text>
              <Text
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
              >
                ₹499{" "}
                <Text as={"span"} fontSize={"15px"}>
                  /25 Quiz
                </Text>
              </Text>
              <Text
                fontSize={["12px", "12px", "15px", "12px", "15px"]}
                marginBottom={["10px", "10px", "25px", "25px"]}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                Click on the button below to Pay ₹499 for 25 quizzes{" "}
                <Tag size={"sm"} colorScheme="purple">
                  <b>(Only ₹20 per quiz)</b>
                </Tag>
                and stand a chance to participate in our Quaterly contests and
                win prizes
              </Text>

              <Accordion
                allowToggle
                display={["block", "block", "none", "none"]}
                border={"1px solid #a4b5fc"}
                borderRadius={"10px"}
                outline={"none"}
                marginBottom={["15px", "15px", "35px", "35px"]}
              >
                <AccordionItem border={"none"} borderRadius={"10px"}>
                  <h2
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionButton borderRadius={"10px"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        borderRadius={"10px"}
                      >
                        Benefits
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    borderRadius={"10px"}
                    marginTop={"10px"}
                  >
                    <List>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>25 Quizzes (₹20 per quiz)</b>
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        Stand a chance to participate in our Quaterly contests
                        and win prizes
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>
                          Validity : Use this quiz balance anytime in the next 6
                          months
                        </b>
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Button
                width={"100%"}
                background={"#4E47E5"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #4E47E5",
                  boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
                }}
                marginBottom={["0", "0", "25px", "25px"]}
                onClick={() => handlePayment(email, "499")}
              >
                Click to Add Quiz Balance
              </Button>

              <List display={["none", "none", "block", "block"]}>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>25 Quizzes (₹20 per quiz)</b>
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> Stand
                  a chance to participate in our Quaterly contests and win
                  prizes
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>
                    Validity : Use this quiz balance anytime in the next 6
                    months
                  </b>
                </ListItem>
              </List>
            </Box>
            <Box
              border={"1px solid #ccc"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Box
                marginBottom={["0px", "0px", "10px", "10px"]}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={["flex-start", "flex-start", "center", "center"]}
                flexDir={["column", "column", "row", "row"]}
              >
                <Text
                  fontSize={["18px", "18px", "18px", "20px"]}
                  fontWeight={700}
                >
                  Committed to Success
                </Text>
                <Tag
                  margin={["5px 0", "5px 0", "", ""]}
                  colorScheme="purple"
                  size={["sm", "sm", "md", "sm", "md"]}
                >
                  Most Economical
                </Tag>
              </Box>
              <Text
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
              >
                ₹1999{" "}
                <Text as={"span"} fontSize={"15px"}>
                  /200 Quiz
                </Text>
              </Text>
              <Text
                fontSize={["12px", "12px", "15px", "12px", "15px"]}
                marginBottom={["10px", "10px", "25px", "25px"]}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                Click on the button below to Pay ₹1999 for 200 quizzes{" "}
                <Text
                  as={"span"}
                  background={"#E9D8FD"}
                  padding={"2px 5px"}
                  borderRadius={"5px"}
                  color={"#58478A"}
                  whiteSpace={"nowrap"}
                >
                  (Only ₹10 per quiz)
                </Text>{" "}
                and stand a chance to participate in our annual contests and win
                Mega Prizes
              </Text>

              <Accordion
                allowToggle
                display={["block", "block", "none", "none"]}
                border={"1px solid #a4b5fc"}
                borderRadius={"10px"}
                outline={"none"}
                marginBottom={["15px", "15px", "35px", "35px"]}
              >
                <AccordionItem border={"none"} borderRadius={"10px"}>
                  <h2
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionButton borderRadius={"10px"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        borderRadius={"10px"}
                      >
                        Benefits
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    borderRadius={"10px"}
                    marginTop={"10px"}
                  >
                    <List>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>200 Quizzes (₹10 per quiz)</b>
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        Get a chance to participate in our annual contests
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        Win Mega Prizes
                      </ListItem>
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        gap={5}
                        marginBottom={"10px"}
                        fontSize={["12px", "12px", "14px", "14px"]}
                        color={"#59626F"}
                        fontWeight={"bold"}
                      >
                        <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                        <b>
                          Validity : Use this quiz balance anytime in the next 3
                          years
                        </b>
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Button
                width={"100%"}
                background={"#4E47E5"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #4E47E5",
                  boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
                }}
                marginBottom={["0", "0", "25px", "25px"]}
                onClick={() => handlePayment(email, "1999")}
              >
                Click to Add Quiz Balance
              </Button>

              <List display={["none", "none", "block", "block"]}>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>200 Quizzes (₹10 per quiz)</b>
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> Get a
                  chance to participate in our annual contests
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} /> Win
                  Mega Prizes
                </ListItem>
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  marginBottom={"10px"}
                  fontSize={["12px", "12px", "14px", "14px"]}
                  color={"#59626F"}
                  fontWeight={"bold"}
                >
                  <CheckCircleIcon fontSize={"18px"} color={"#4E47E5"} />{" "}
                  <b>
                    Validity : Use this quiz balance anytime in the next 3 years
                  </b>
                </ListItem>
              </List>

              {/* <Box mt={5}>
                <video
                  style={{
                    borderRadius: "10px",
                    maxHeight: "600px",
                    margin: "auto",
                  }}
                  width={"100%"}
                  height={"100%"}
                  autoPlay
                  controls
                >
                  <source
                    src={
                      "https://dl.dropboxusercontent.com/scl/fi/e53vun8139fg2d06bwumy/1999.mp4?rlkey=yoj3q20l89wrtzw9z5ihxq9q4&dl=0"
                    }
                    type="video/mp4"
                  />
                </video>
              </Box> */}
            </Box>

            {/* ----------------------------Bonus---------------------------- */}

            {/* <Box
              textAlign={"center"}
              ref={ref}
              border={"1px solid #ccc"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Text
                textAlign={"left"}
                fontSize={["18px", "18px", "18px", "20px"]}
                fontWeight={700}
              >
                Bonus
              </Text>

              <Text
                textAlign={"left"}
                fontSize={["12px", "12px", "15px", "14px", "15px"]}
                margin={"15px 0"}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                When your friend or cousin that you have invited attends 5 free
                sessions with us. You are also gifted a Rs 300 Amazon Voucher
                from Wisechamps.
              </Text>
              <Image
                maxWidth={"400px"}
                width={"100%"}
                margin={"10px auto"}
                src={voucher}
                alt="300 Amazon Voucher"
                border={"1px solid #ccc"}
                borderRadius={"10px"}
              />
              <Button
                margin={"10px auto"}
                width={"100%"}
                background={"#4E47E5"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                onClick={() =>
                  (window.location.href = `https://wa.me?text=Hi!%20I%20am%20learning%20a%20lot%20through%20Wisechamps%20Final%20Exam%20Practice%20Sessions.%20These%20quizzes%20are%20FUN%20%26%20INTERESTING%20way%20of%20LEARNING%20regularly.%20%0A%0AI%20am%20sure%20this%20time%20I%20will%20Ace%20my%20final%20Math%20and%20Science%20Exams.%0A%0AWinners%20also%20get%20gifts!%20So%20Don%27t%20Miss%20out...%0A%0AClick%20here%20to%20register%20your%20name%20and%20participate%20in%20free%20sessions%20%F0%9F%91%87%0Ahttps%3A%2F%2Freferral.wisechamps.com%3FrefereeId%3D${user.phone}%20%0A%0ASee%20you%20there%20%F0%9F%92%A1`)
                }
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #4E47E5",
                  boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
                }}
              >
                Invite a Cousin / Friend
              </Button>
            </Box> */}

            {/* ----------------------------Schedule---------------------------- */}

            {/* <Box
              ref={refSchedule}
              border={"1px solid #ccc"}
              width={"100%"}
              minHeight={["auto", "100%", "100%", "100%"]}
              padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                border: "1px solid #4F47E4",
              }}
            >
              <Text
                textAlign={"left"}
                fontSize={["18px", "18px", "18px", "20px"]}
                fontWeight={700}
              >
                Schedule
              </Text>

              <Text
                textAlign={"left"}
                fontSize={["12px", "12px", "15px", "14px", "15px"]}
                margin={"15px 0"}
                color={"#59626F"}
                fontWeight={"bold"}
              >
                Our Live Quiz Schedule.
              </Text>
              <TableContainer
                width={"100%"}
                borderRadius={"15px"}
                border={"1px solid #4f46e4"}
              >
                <Table variant="simple">
                  <Thead background={"#4f47e4"}>
                    <Tr>
                      <Th color={"#fff"} fontSize={"15px"}>
                        Day
                      </Th>
                      <Th color={"#fff"} fontSize={"15px"}>
                        Time
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Thursday</Td>
                      <Td>7PM</Td>
                    </Tr>
                    <Tr>
                      <Td>Friday</Td>
                      <Td>7PM</Td>
                    </Tr>
                    <Tr>
                      <Td>Saturday</Td>
                      <Td>7PM</Td>
                    </Tr>
                    <Tr>
                      <Td>Sunday</Td>
                      <Td>11AM</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box> */}
          </Box>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <Box
        display={"flex"}
        width={"100%"}
        height={"90vh"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Header />

        <div>
          <Heading>Something Went Wrong. Please Refresh</Heading>
        </div>
      </Box>
    );
  }

  if (mode === "nouser") {
    return (
      <Box
        display={"flex"}
        width={"100%"}
        height={"90vh"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Header />

        <div className="email-not-found">
          <p
            style={{
              marginBottom: "20px",
            }}
          >
            This Email is not registered with us. <br />
            Please use a registered Email Address
          </p>
          <div>
            <button id="submit-btn" onClick={() => setMode("")}>
              Try Again
            </button>
            <button
              id="submit-btn"
              onClick={() => {
                window.open(
                  `https://wa.me/919717094422?text=${encodeURIComponent(
                    "Please send me my registered email"
                  )}`,
                  "_blank"
                );
                setMode("");
              }}
            >
              Get Your Registered Email
            </button>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="main">
        <h3>Email</h3>
        <div className="form">
          <input
            className="input"
            type="email"
            placeholder="Enter Email"
            inputMode="email"
            onChange={handleChange}
          />
          <p>* Please use the registered Email.</p>
          <button id="submit-btn" onClick={() => handleClick(email)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
