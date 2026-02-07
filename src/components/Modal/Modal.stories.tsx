import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A reusable modal component with accessibility features including focus management, keyboard navigation, and proper ARIA attributes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is visible",
    },
    title: {
      control: "text",
      description: "Modal title displayed in the header",
    },
    ariaLabel: {
      control: "text",
      description: "Custom aria-label for the modal (optional)",
    },
    onClose: {
      action: "closed",
      description: "Callback function called when modal is closed",
    },
    children: {
      control: false,
      description: "Content to display inside the modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper component for stories
const ModalWrapper = ({
  children,
  title = "Example Modal",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper>
      <p>This is a basic modal with simple text content.</p>
      <p>You can close it by:</p>
      <ul>
        <li>Clicking the × button</li>
        <li>Pressing the Escape key</li>
        <li>Clicking outside the modal</li>
      </ul>
    </ModalWrapper>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalWrapper title="Contact Form">
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Message:
          </label>
          <textarea
            id="message"
            rows={4}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
        >
          <Button variant="default">Cancel</Button>
          <Button variant="success">Send</Button>
        </div>
      </form>
    </ModalWrapper>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <ModalWrapper title="Terms of Service">
      <div style={{ maxHeight: "400px" }}>
        <h3>1. Introduction</h3>
        <p>
          Welcome to our service. These terms govern your use of our website and
          services.
        </p>

        <h3>2. User Responsibilities</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </p>
        <ul>
          <li>Keep your login credentials secure</li>
          <li>Do not share your account with others</li>
          <li>Notify us of any unauthorized use</li>
        </ul>

        <h3>3. Content Policy</h3>
        <p>Users must not post content that is:</p>
        <ul>
          <li>Illegal or harmful</li>
          <li>Infringing on intellectual property</li>
          <li>Spam or misleading</li>
          <li>Hateful or discriminatory</li>
        </ul>

        <h3>4. Privacy</h3>
        <p>
          We take your privacy seriously and handle your data according to our
          Privacy Policy.
        </p>

        <h3>5. Limitation of Liability</h3>
        <p>Our liability is limited to the maximum extent permitted by law.</p>

        <h3>6. Changes to Terms</h3>
        <p>
          We may update these terms from time to time. Continued use constitutes
          acceptance of new terms.
        </p>

        <h3>7. Contact Information</h3>
        <p>
          If you have questions about these terms, please contact us at
          legal@example.com.
        </p>
      </div>
    </ModalWrapper>
  ),
};

const CustomAriaLabelStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="User Settings"
        ariaLabel="User settings configuration dialog"
      >
        <p>This modal has a custom aria-label for better accessibility.</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" />
            Enable notifications
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" />
            Dark mode
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" />
            Auto-save preferences
          </label>
        </div>
      </Modal>
    </>
  );
};

export const WithCustomAriaLabel: Story = {
  render: CustomAriaLabelStory,
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    title: "Always Visible Modal",
    children: (
      <div>
        <p>This modal is always open in Storybook for easier design review.</p>
        <p>
          <strong>Note:</strong> In this story mode, the modal won't actually
          close to allow for easier inspection of the component.
        </p>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #0ea5e9",
            borderRadius: "4px",
            marginTop: "16px",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#0369a1" }}>
            Design Features:
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>Centered overlay with backdrop</li>
            <li>Responsive design for mobile devices</li>
            <li>Focus management and keyboard navigation</li>
            <li>Smooth animations and transitions</li>
          </ul>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story shows the modal in a permanently open state for design inspection. The close functionality is disabled in this story only.",
      },
    },
  },
};
