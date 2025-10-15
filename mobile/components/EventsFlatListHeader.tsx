import { Box } from "./ui/box";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { ScrollView, TouchableOpacity } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { Icon, SearchIcon } from "./ui/icon";
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
  return (
    <Box className="flex mb-4 px-2 gap-2">
      <Box>
        <Input variant="rounded" size="lg">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
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
          {eventFilters.map((item) => {
            const isSelectedFilter = selectedFilter.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() => setSelectedFilter(item)}
              >
                <Badge
                  className={`gap-2 p-2 rounded-xl ${isSelectedFilter ? "bg-primary-500 border-0" : " bg-transparent border border-primary-500 rounded-xl"}`}
                >
                  <BadgeText
                    className={`normal-case font-bold ${isSelectedFilter ? "text-primary-0" : "text-typography-0"}`}
                  >
                    {item.displayName}
                  </BadgeText>

                  <Icon
                    as={item.icon}
                    className={
                      isSelectedFilter ? "text-primary-0" : "text-typography-0"
                    }
                  />
                </Badge>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default EventsFlatListHeader;
