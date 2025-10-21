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
import { useCallback, useMemo } from "react";
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
import { useTranslation } from "react-i18next";
import { LanguageCode } from "@/types/models";
import { router } from "expo-router";

// todo :Dil entegrasyonunu bitir. Tasarımı eksik olan sayfaları ypamaya basla. Suanda etkinlik ile ilgili gereken şeyleri bitirdigimi dusnuyorum bu yüzden artık backende geç ve etkinlik ile ilgili ne grekiyorsa onu kodla.

const SettingsScreen = () => {
  const {
    theme,
    language,
    toggleTheme: handleToggleTheme,
    changeLanguage: handleChangeLanguage,
  } = useAppStore((state) => state);

  const { t } = useTranslation("profile");

  const handleLogOut = useCallback(async () => {
    console.log("cikis yapildi");
    await useAppStore.getState().logout();
    router.replace("/auth/login");
  }, []);

  const languageOptions = useMemo(
    () => [
      { label: t("settings.languageOptions.en"), value: "en" as LanguageCode },
      { label: t("settings.languageOptions.tr"), value: "tr" as LanguageCode },
    ],
    [t]
  );

  const selectedLanguageLabel = languageOptions.find(
    (opt) => opt.value === language
  )?.label;

  const DATA = useMemo(
    () => [
      {
        title: t("settings.notificationPreferences"),
        data: [
          {
            title: t("settings.emailNotifications"),
            rightNode: <Switch />,
            icon: Mail,
          },
          {
            title: t("settings.appNotifications"),
            rightNode: <Switch />,
            icon: Bell,
          },
        ],
      },
      {
        title: t("settings.appPreferences"),
        data: [
          {
            title: t("settings.theme"),
            rightNode: (
              <Switch
                value={theme === "dark"}
                onValueChange={handleToggleTheme}
              />
            ),
            icon: SunMoon,
          },
          {
            title: t("settings.language"),
            rightNode: (
              <Select
                selectedValue={language}
                onValueChange={(val) => handleChangeLanguage(val)}
              >
                <SelectTrigger variant="underlined" size="lg">
                  <SelectInput
                    placeholder={t("settings.language")}
                    value={selectedLanguageLabel}
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
                    {languageOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        label={opt.label}
                        value={opt.value}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            ),
            icon: Globe,
          },
        ],
      },
      {
        title: t("settings.supportAndAbout"),
        data: [
          {
            title: t("settings.help"),
            rightNode: (
              <Icon as={ChevronRight} className="text-typography-500" />
            ),
            icon: HelpCircle,
          },
          {
            title: t("settings.version"),
            rightNode: <Text className="text-typography-200">1.0</Text>,
            icon: Info,
          },
        ],
      },
    ],
    [
      theme,
      language,
      t,
      selectedLanguageLabel,
      handleToggleTheme,
      handleChangeLanguage,
      languageOptions,
    ]
  );

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
          {t("settings.logout")}
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
    ></SectionList>
  );
};

export default SettingsScreen;
