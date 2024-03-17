// should have a message when the component is rendered
/**
 * skenario testing
 *
 * - AlertMessage component
 *   - should have a title when the component is rendered
 */

/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound.tsx';

expect.extend(matchers);

describe('NotFound component', () => {
  it('should have a message when the component is rendered', async () => {
    // Arrange
    const title = 'Category not found.';
    render(
      <MemoryRouter>
        <NotFound title={title} />
      </MemoryRouter>,
    );

    // Action
    // const alertParagraph = await screen.findByText(message);
    const titleParagraph = await screen.findByText(title);

    // Assert
    // expect(titleParagraph).toBeInTheDocument();
    expect(titleParagraph).toHaveTextContent(title);
  });
});
