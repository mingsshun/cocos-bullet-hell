import { MoveComponent } from '../Components/MoveComponent';
import { ComponentKey } from './ComponentKey';

export type ComponentMap = {
  [ComponentKey.MOVE]: MoveComponent;
  //   [ComponentKey.INPUT]: InputComponent;
  //   [ComponentKey.HEALTH]: HealthComponent;
  //   [ComponentKey.COLLIDER]: ColliderComponent;
  //   [ComponentKey.AI]: AIComponent;
  //   [ComponentKey.DAMAGE]: DamageComponent;
};