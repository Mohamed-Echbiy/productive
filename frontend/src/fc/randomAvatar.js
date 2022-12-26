export function RandomAvatar(params) {
  const listOfAvatar = ["./avatar/animal-1.1s-200px.svg"];
  for (let index = 1; index < 12; index++) {
    const element = listOfAvatar.push(
      `./avatar/animal-1.1s-200px(${index}).svg`
    );
  }

  const luckyNumber = Math.floor(Math.random() * listOfAvatar.length);
  const avatar = listOfAvatar[luckyNumber];
  return avatar;
}
