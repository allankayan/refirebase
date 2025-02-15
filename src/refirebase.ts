import type { FirebaseApp } from "firebase/app";

import { init } from "./firebase";

import { FirebaseAnalytics } from "./firebase/analytics";
import { FirestoreDatabase } from "./firebase/firestore";
import { RealtimeDatabase } from "./firebase/realtime";
import { StorageFirebase } from "./firebase/storage";
import { FirebaseAuth } from "./firebase/auth";

import { FirebaseConfig } from "./types/firebase/config";
import { WhereCondition } from "./types/firebase/firestore";

export class Refirebase {
  private readonly config: FirebaseConfig;
  private readonly app: FirebaseApp;

  public readonly db: {
    firestore: FirestoreDatabase;
    realtime: RealtimeDatabase;
    storage: StorageFirebase;
  };

  public readonly auth: FirebaseAuth;
  public readonly analytics: FirebaseAnalytics;

  constructor(config: FirebaseConfig) {
    const keys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"];

    if (
      !config ||
      typeof config !== "object" ||
      Array.isArray(config) ||
      keys.some((key) => typeof config[key as keyof FirebaseConfig] !== "string")
    ) {
      const missingKeys = keys.filter((key) => !config[key as keyof FirebaseConfig]).sort();

      throw new Error(
        `Refirebase: Missing required keys in config: ${missingKeys.join(", ")}`
      );
    }

    this.config = config;

    this.app = init(this.config);

    this.db = {
      firestore: new FirestoreDatabase(this.app),
      realtime: new RealtimeDatabase(this.app),
      storage: new StorageFirebase(this.app),
    };

    this.auth = new FirebaseAuth(this.app);
    this.analytics = new FirebaseAnalytics(this.app);
  }
}

export type {
  // Default
  FirebaseConfig as RefirebaseConfig,
  FirebaseApp as RefirebaseApp,
  // Databases
  FirestoreDatabase as RefirebaseFirestore,
  RealtimeDatabase as RefirebaseRealtime,
  StorageFirebase as RefirebaseStorage,
  // Services
  FirebaseAuth as RefirebaseAuth,
  FirebaseAnalytics as RefirebaseAnalytics,
  // Others
  WhereCondition as RefirebaseWhereCondition,
};
