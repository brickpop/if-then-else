import { IfProps } from './types';

export function resolveCondition(props: IfProps): boolean {
  if ('true' in props) return !!props.true;
  else if ('not' in props) return !props.not;
  else if ('val' in props) {
    if ('is' in props) return props.val === props.is;
    else if ('isNot' in props) return props.val !== props.isNot;
    else if ('above' in props) return (props.val as number) > props.above;
    else if ('below' in props) return (props.val as number) < props.below;
    else if ('atLeast' in props) return (props.val as number) >= props.atLeast;
    else if ('atMost' in props) return (props.val as number) <= props.atMost;
  } else if ('lengthOf' in props) {
    if ('is' in props) return props.lengthOf.length === props.is;
    else if ('isNot' in props) return props.lengthOf.length !== props.isNot;
    else if ('above' in props) return props.lengthOf.length > props.above;
    else if ('below' in props) return props.lengthOf.length < props.below;
    else if ('atLeast' in props) return props.lengthOf.length >= props.atLeast;
    else if ('atMost' in props) return props.lengthOf.length <= props.atMost;
  } else if ('all' in props) {
    for (const c of props.all) if (!c) return false;
    return true;
  } else if ('some' in props) {
    for (const c of props.some) if (c) return true;
    return false;
  } else if ('notAll' in props) {
    for (const c of props.notAll) if (!c) return true;
    return false;
  } else if ('none' in props) {
    for (const c of props.none) if (c) return false;
    return true;
  }

  return false;
}
