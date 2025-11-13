using System;
using System.Collections.Generic;
using UserService.Application.User.Commands;

namespace UserService.Infrastructure.Extensions
{
    public static class MapsterExtensions
    {
       public static void AdaptToTargetWithAttributes(this UpdateUserProfileCommand command, Dictionary<string, string[]> targetAttributes)
{
    // var attrs = command.Attributes;
    if (!string.IsNullOrWhiteSpace(command.PhoneNumber))
        targetAttributes["phoneNumber"] = [command.PhoneNumber];

    if (!string.IsNullOrWhiteSpace(command.AvatarUrl))
        targetAttributes["avatarUrl"] = [command.AvatarUrl];

    if (!string.IsNullOrWhiteSpace(command.University))
        targetAttributes["university"] = [command.University];

    if (!string.IsNullOrWhiteSpace(command.Department))
        targetAttributes["department"] = [command.Department];
}
    }
}