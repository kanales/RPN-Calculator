
window.onload = () => {
  const stack = [];
  const buttons = document.querySelectorAll('.btn');

  const displays_ = document.querySelectorAll('.display');
  const displays = [];

  for (let i = 0; i < displays_.length; i++) {
    displays.push(displays_[i]);
    displays_[i].value = '0';
  }
  displays.reverse();
  const inputer = displays.shift();

  const perform = value => {
    let left, right;
    let curnum = inputer.value || '0';

    for (let _ in displays) { stack.pop() }

    for (let display of [...displays].reverse()) {
      stack.push(+display.value || 0);
    }


    for (let i = 0; i < displays.length && i < stack.length; i++) {
      stack[stack.length - 1 - i] = +displays[i].value || stack[stack.length - 1 - i];
    }

    if (value >= '0' && value <= '9') {
      //number
      curnum = (curnum == '0') ? value : curnum + value;
    } else switch (value) {
      case '.':
        curnum += '.';
      case 'pop':
        stack.pop();
        break;
      case 'inv':
        stack.push(-stack.pop());
        break;
      case 'dup':
        stack.push(stack[stack.length - 1]);
        break;
      case '*':
        left = stack.pop();
        right = stack.pop();
        stack.push(left * right);
        break;
      case '/':
        left = stack.pop();
        right = stack.pop();
        stack.push(right / left);
        break;

      case '+':
        left = stack.pop();
        right = stack.pop();
        stack.push(left + right);
        break;

      case 'minus':
        left = stack.pop();
        right = stack.pop();
        stack.push(left - right);
        break;

      case '=':
        stack.push(+curnum);
        curnum = '';
        break;
      default:
        console.error('unknown: ' + value);
        break;
    }

    inputer.value = curnum || '0';

    console.log(stack.length);
    for (let i = 0; i < displays.length && i < stack.length; i++) {
      displays[i].value = stack[stack.length - 1 - i];
    }
    for (let i = stack.length; i < displays.length; i++) {
      displays[i].value = '0';
    }

  }

  for (let button of buttons) {
    button.addEventListener('click', ev => {
      const value = ev.target.id.split('-')[1];
      perform(value);
    });
  }


}
