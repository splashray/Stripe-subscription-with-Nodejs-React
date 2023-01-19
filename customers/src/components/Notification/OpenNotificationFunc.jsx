export function notificationToggleFunc(isNotificationOpen, setIsNotificationOpen) {
  return () => {
    if (isNotificationOpen === "hidden") {
      setIsNotificationOpen("")
    } else {
      setIsNotificationOpen("hidden")
    }
  }
}