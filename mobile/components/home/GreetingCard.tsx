import { StyleSheet } from "react-native";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User } from "@/types/models";
import { useTranslation } from "react-i18next";

const GreetingCard = ({ user }: { user: User | null }) => {
  const { t: tHome } = useTranslation("home");

  console.log(user);

  return (
    <Box className=" p-2 mb-4 flex-row justify-between items-center ">
      <Box>
        <Text className="text-2xl font-bold text-typography-0">
          {`${tHome("greeting.title")} ${user?.fullName}`}
        </Text>
        <Text className="text-lg font-normal text-typography-200">
          {tHome("greeting.subTitle")}
        </Text>
      </Box>
      <Avatar size={"lg"}>
        <AvatarImage
          source={{
            uri: user?.attributes.avatarUrl,
          }}
        />
      </Avatar>
    </Box>
  );
};

export default GreetingCard;

const styles = StyleSheet.create({});
