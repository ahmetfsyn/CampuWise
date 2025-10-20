import { SectionList, Switch } from "react-native";
import useAppStore from "@/store/useAppStore";
import {
  Bell,
  ChevronDownIcon,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  Mail,
  SunMoon,
} from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import AnimatedButton from "@/components/AnimatedButton";
import { useCallback } from "react";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
// todo : Seçili olan dile göre selectboxı guncellemek gerek gösterirken labelı gostermem lazım . tasarımı eksik olan sayfaları ypamaya basla. mesela etkinlik olustur sayfasını yap ve hook form u entegre et
const SettingsScreen = () => {
  const {
    theme,
    language,
    toggleTheme: handleToggleTheme,
    changeLanguage: handleChangeLanguage,
  } = useAppStore((state) => state);

  const handleLogOut = useCallback(() => {
    console.log("cikis yapildi");
  }, []);

  const DATA = [
    {
      title: "Bildirim Terchileri",
      data: [
        {
          title: "Email Bildirimleri",
          rightNode: <Switch />,
          icon: Mail,
        },
        {
          title: "Uygulama Bildirimleri",
          rightNode: <Switch />,
          icon: Bell,
        },
      ],
    },
    {
      title: "Uygulama Terchileri",
      data: [
        {
          title: "Tema",
          rightNode: (
            <Switch
              value={theme === "dark"}
              onValueChange={handleToggleTheme}
            />
          ),
          icon: SunMoon,
        },
        {
          title: "Dil",
          rightNode: (
            <Select
              selectedLabel={language}
              // selectedValue={language}
              onValueChange={(val) => handleChangeLanguage(val)}
            >
              <SelectTrigger variant="underlined" size="lg">
                <SelectInput
                  placeholder="Dil"
                  className="text-typography-500"
                />
                <Icon
                  className="mr-3 text-typography-500"
                  as={ChevronDownIcon}
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Türkçe" value="tr" />
                  <SelectItem label="İngilizce" value="en" />
                </SelectContent>
              </SelectPortal>
            </Select>
          ),
          icon: Globe,
        },
      ],
    },

    {
      title: "Destek & Hakkımızda",
      data: [
        {
          title: "Yardım",
          rightNode: <Icon as={ChevronRight} className="text-typography-500" />,
          icon: HelpCircle,
        },
        {
          title: "Sürüm",
          rightNode: <Text className="text-typography-200">1.0</Text>,
          icon: Info,
        },
      ],
    },
  ];
  return (
    <SectionList
      sections={DATA}
      contentContainerClassName="p-6 gap-2"
      ListFooterComponentClassName="mt-6"
      keyExtractor={(item) => item.title}
      ListFooterComponent={
        <AnimatedButton
          className="h-14"
          action={"negative"}
          size={"lg"}
          onPress={handleLogOut}
        >
          Çıkış Yap
        </AnimatedButton>
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text className="text-typography-0 text-xl font-bold">{title}</Text>
      )}
      renderItem={({ item }) => (
        <Box className="px-1">
          <Box className="flex-row justify-between items-center">
            <Box className="flex-row gap-2 items-center">
              <Icon as={item.icon} size={24} className="text-typography-0" />
              <Text className="text-typography-0 text-lg">{item.title}</Text>
            </Box>
            {item.rightNode}
          </Box>
        </Box>
      )}
    >
      {/* <Text>SettingsScreen</Text>
      <AnimatedButton
        onPress={handleToggleTheme}
        icon={
          <Icon
            as={theme === "dark" ? Sun : Moon}
            size={24}
            className="text-primary-0"
          />
        }
      /> */}
    </SectionList>
  );
};

export default SettingsScreen;
