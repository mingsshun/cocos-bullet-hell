import { AIComponent } from '../Components/AIComponent';
import { ColliderComponent } from '../Components/ColliderComponent';
import { DashComponent } from '../Components/DashComponent';
import { HealthComponent } from '../Components/HealthComponent';
import { MoveComponent } from '../Components/MoveComponent';
import { ShootComponent } from '../Components/ShootComponent';
import { InputSystem } from '../Systems/InputSystem';
import { ComponentKey } from './ComponentKey';

export type ComponentMap = {
  [ComponentKey.MOVE]: MoveComponent;
  [ComponentKey.INPUT]: InputSystem;
  [ComponentKey.DASH]: DashComponent;
  [ComponentKey.HEALTH]: HealthComponent;
  [ComponentKey.COLLIDER]: ColliderComponent;
  [ComponentKey.SHOOT]: ShootComponent;
  [ComponentKey.AI]: AIComponent;
};