import { DashComponent } from '../Components/DashComponent';
import { MoveComponent } from '../Components/MoveComponent';
import { InputSystem } from '../Systems/InputSystem';
import { ComponentKey } from './ComponentKey';

export type ComponentMap = {
  [ComponentKey.MOVE]: MoveComponent;
  [ComponentKey.INPUT]: InputSystem;
  [ComponentKey.DASH]: DashComponent;
};