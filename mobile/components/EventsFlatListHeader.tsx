import { Box } from "./ui/box";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { ScrollView, TouchableOpacity } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { SearchIcon } from "./ui/icon";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { eventFilters } from "@/mocks/mockData";

export type EventsFlatListHeaderProps = {
  selectedFilter: (typeof eventFilters)[number];
  setSelectedFilter: (filter: (typeof eventFilters)[number]) => void;
  searchString: string;
  setSearchString: (text: string) => void;
};

const EventsFlatListHeader = ({
  selectedFilter,
  searchString,
  setSearchString,
  setSelectedFilter,
}: EventsFlatListHeaderProps) => {
  const { colors } = useTheme();
  return (
    <Box className="flex mb-4 px-2 gap-2">
      <Box>
        <Input
          style={{
            borderColor: colors.border,
          }}
          variant="rounded"
          size="lg"
        >
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            style={{ color: colors.text }}
            placeholder="Ara..."
            value={searchString}
            onChangeText={(text) => setSearchString(text)}
          />
        </Input>
      </Box>
      <Box>
        <ScrollView
          horizontal
          contentContainerClassName="gap-4"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {eventFilters.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.5}
              onPress={() => setSelectedFilter(item)}
            >
              <Badge
                className="gap-2 p-2 rounded-xl"
                style={{
                  borderWidth: selectedFilter.id === item.id ? 0 : 0.2,
                  borderColor:
                    selectedFilter.id === item.id
                      ? colors.primary
                      : colors.secondary,
                  backgroundColor:
                    selectedFilter.id === item.id
                      ? colors.primary
                      : colors.background,
                }}
              >
                <BadgeText
                  style={{
                    color:
                      item.id === selectedFilter.id
                        ? colors.background
                        : colors.primary,
                  }}
                  className="normal-case font-bold"
                >
                  {item.displayName}
                </BadgeText>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={16}
                  color={
                    selectedFilter.id === item.id
                      ? colors.background
                      : colors.primary
                  }
                  style={{ marginLeft: 4 }}
                />
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default EventsFlatListHeader;
