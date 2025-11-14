import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Bookmark, Grid } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export type ProfileTabsProps = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const ProfileTabs = ({ activeIndex, setActiveIndex }: ProfileTabsProps) => {
  return (
    <>
      <HStack space={0} className="flex-1">
        {[Grid, Bookmark].map((tab, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => setActiveIndex(index)}
            className="flex-1"
          >
            <Box className="flex  items-center">
              <Icon
                as={tab}
                size={24}
                className={
                  "text-typography-0 " +
                  (index === activeIndex ? "text-primary-500" : "")
                }
              />
            </Box>
            <Box
              className={
                index === activeIndex
                  ? "bg-primary-500 h-1 rounded-xl mt-2 mx-2"
                  : ""
              }
            />
          </TouchableOpacity>
        ))}
      </HStack>
    </>
  );
};

export default ProfileTabs;
