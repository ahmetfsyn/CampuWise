import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { createEventFormSchema } from "@/validations/create-event-form";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectBackdrop,
  SelectIcon,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import AnimatedButton from "@/components/AnimatedButton";
import {
  CalendarClock,
  ChevronDownIcon,
  MapPin,
  Plus,
} from "lucide-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCallback, useState } from "react";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { eventFilters } from "@/mocks/mockData";
import { Image } from "expo-image";
import pickImage from "@/utils/pickImage";
import { Icon } from "@/components/ui/icon";
import { useTranslation } from "react-i18next";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import { useRouter } from "expo-router";

const CreateEventScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { t } = useTranslation("events");
  const { handleCreateEvent, isCreating } = useCreateEvent();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    await handleCreateEvent(data);
    // reset();
    return router.canGoBack() && router.back();
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: null,
      place: "",
      category: "",
      imageUrl: "",
    },
    mode: "all",
    resolver: zodResolver(createEventFormSchema),
  });

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirmDate = (date: Date) => {
    setValue("startDate", date, { shouldValidate: true });
    hideDatePicker();
  };

  const handlePickImage = useCallback(async () => {
    const image = await pickImage({
      aspect: [4, 3],
      allowsEditing: true,
    });

    setValue("imageUrl", image?.uri);
  }, [setValue]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-4"
      >
        <Box className="gap-4">
          {/* Title */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <>
                <Input variant="rounded" isInvalid={!!errors.title} size="lg">
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("placeholders.titlePlaceholder")}
                  />
                </Input>
                {errors.title && (
                  <Text className="text-error-300">
                    {t(errors.title.message as string)}
                  </Text>
                )}
              </>
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <Textarea size={"lg"} className="rounded-xl">
                  <TextareaInput
                    onChangeText={onChange}
                    value={value}
                    placeholder={t("placeholders.descriptionPlaceholder")}
                  />
                </Textarea>
                {errors.description && (
                  <Text className="text-error-300">
                    {errors.description.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Location */}
          <Controller
            control={control}
            name="place"
            render={({ field: { onChange, value } }) => (
              <>
                <Input variant="rounded" isInvalid={!!errors.place} size="lg">
                  <InputSlot className="pl-3 ">
                    <InputIcon as={MapPin} />
                  </InputSlot>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("placeholders.locationPlaceholder")}
                  />
                </Input>
                {errors.place && (
                  <Text className="text-error-300">
                    {t(errors.place.message as string)}
                  </Text>
                )}
              </>
            )}
          />

          {/* Category */}
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <>
                <Select
                  isInvalid={!!errors.category}
                  selectedValue={value}
                  onValueChange={onChange}
                >
                  <SelectTrigger
                    className="rounded-xl h-14"
                    variant="rounded"
                    size="lg"
                  >
                    <SelectInput
                      className="text-typography-0"
                      placeholder={t("placeholders.categoryPlaceholder")}
                    />
                    <SelectIcon className="ml-auto mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      {eventFilters.slice(1).map((category, index) => (
                        <SelectItem
                          key={index}
                          label={category.title}
                          value={category.category}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
                {errors.category && (
                  <Text className="text-error-300">
                    {t(errors.category.message as string)}
                  </Text>
                )}
              </>
            )}
          />

          {/* Date */}
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value } }) => (
              <>
                <Pressable onPress={showDatePicker}>
                  <Input
                    isInvalid={!!errors.startDate}
                    size={"lg"}
                    pointerEvents="none"
                  >
                    <InputField
                      editable={false}
                      value={value?.toLocaleString()}
                      placeholder={t("placeholders.startingDatePlaceholder")}
                    />
                    <InputSlot className="pr-3">
                      <InputIcon as={CalendarClock} />
                    </InputSlot>
                  </Input>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirmDate}
                  onCancel={hideDatePicker}
                />
                {errors.startDate && (
                  <Text className="text-error-300">
                    {t(errors.startDate.message as string)}
                  </Text>
                )}
              </>
            )}
          />

          {/* Event Image */}
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Pressable onPress={handlePickImage}>
                    <Box
                      className={`h-48 rounded-xl justify-center items-center ${
                        value
                          ? ""
                          : "border border-dashed border-background-500"
                      }`}
                    >
                      {value ? (
                        <Image
                          contentFit="fill"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 12,
                          }}
                          source={{ uri: value }}
                        />
                      ) : (
                        <Box className="items-center rounded-xl">
                          <Icon
                            as={Plus}
                            size={24}
                            className="text-typography-500"
                          />
                          <Text className="text-typography-500 mt-2">
                            {t("placeholders.uploadEventImagePlaceholder")}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Pressable>
                </>
              );
            }}
          />

          <AnimatedButton
            className="h-14 mt-4"
            textClassName="uppercase"
            isDisabled={isCreating || !isValid}
            onPress={handleSubmit(onSubmit)}
          >
            {t("buttons.createEvent")}
          </AnimatedButton>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;
