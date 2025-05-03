# Import Hierarchy Guidelines

This document outlines the standardized order for import statements in our project. Following this hierarchy ensures that imports are consistent, readable, and maintainable across all components.

## Import Order

1. **Core Libraries**

   - Import core libraries such as React, ReactDOM, and PropTypes.
   - Example:
     ```js
     import React from "react";
     ```

2. **Third-party Libraries**

   - Import external dependencies from npm or other sources (e.g., `framer-motion`, `react-router-dom`, `axios`).
   - Example:
     ```js
     import { useNavigate } from "react-router-dom";
     ```

3. **Authentication or Firebase-related Imports**

   - Import authentication context, Firebase functions, or Firebase configuration files.
   - Example:
     ```js
     import { useAuth } from "../auth/AuthContext";
     ```

4. **Utilities and Helper Functions**

   - Import utility functions, helper methods, or custom hooks that help with specific tasks (e.g., `roomUtils.js`, `firebaseErrorMessage.js`).
   - Example:
     ```js
     import { createRoom, joinRoom } from "../utils/roomUtils";
     ```

5. **Application Resources (SVGs, Images, Videos, etc.)**

   - Import static assets such as images, SVGs, videos, and other resources.
   - Example:
     ```js
     import logo from "../assets/CineMateLOGO.png";
     ```

6. **Local Components and Modules**

   - Import local components and modules that are part of the current project.
   - Example:
     ```js
     import Header from "./Header";
     ```

7. **Relative Module-Specific Imports**
   - For imports that are local to the component, using `./` or `../` to navigate the file structure.
   - Example:
     ```js
     import { MyComponent } from "../components/MyComponent";
     ```

---

## Additional Guidelines

- **Order matters**: The import order should be strictly followed to maintain consistency and readability across the project.
- **Grouping**: Keep imports logically grouped (e.g., all static resources together, all Firebase imports together).
- **Spacing**: Ensure proper spacing between each group of imports for clarity and readability.

---

### Example:

```js
// 1. Core Libraries
import React from "react";

// 2. Third-party Libraries
import { useNavigate } from "react-router-dom";

// 4. Authentication and Firebase Imports
import { useAuth } from "../auth/AuthContext";
import { db } from "../firebase/firebaseConfig";

// 3. Utilities and Helper Functions
import { createRoom, joinRoom } from "../utils/roomUtils";

// 5. Static Resources (SVGs)
import create_room from "../assets/SVGs/hero_SVGs/create_room.svg";
import play_svg from "../assets/SVGs/videoplayer_SVGs/play_svg.svg";

// 6. Local Components
import Header from "./Header";
```
