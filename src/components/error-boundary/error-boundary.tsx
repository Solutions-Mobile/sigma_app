import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

import { ErrorFallback } from "./error-fallback";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  Props,
  State
> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ) {
    console.error(error);
    console.error(errorInfo);
  }

  private handleRetry = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onRetry={
            this.handleRetry
          }
        />
      );
    }

    return this.props.children;
  }
}
