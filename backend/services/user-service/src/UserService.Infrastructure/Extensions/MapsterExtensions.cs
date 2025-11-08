using System;
using System.Collections.Generic;
using UserService.Application.User.Commands;

namespace UserService.Infrastructure.Extensions
{
    public static class MapsterExtensions
    {
       public static void AdaptToTargetWithAttributes(this UpdateUserProfileCommand command, Dictionary<string, object[]> targetAttributes)
{
    var attrs = command.Attributes;
    if (!string.IsNullOrWhiteSpace(attrs?.PhoneNumber))
        targetAttributes["phoneNumber"] = [attrs.PhoneNumber];

    if (!string.IsNullOrWhiteSpace(attrs?.AvatarUrl))
        targetAttributes["avatarUrl"] = [attrs.AvatarUrl];

    if (!string.IsNullOrWhiteSpace(attrs?.University))
        targetAttributes["university"] = [attrs.University];

    if (!string.IsNullOrWhiteSpace(attrs?.Department))
        targetAttributes["department"] = [attrs.Department];
}
    }
}