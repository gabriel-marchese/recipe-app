import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Testando o component Footer', () => {
  test('Testando a funcionalidade', () => {
    render(<Footer />);

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');
    const buttonMeal = screen.getByTestId('meals-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeal).toBeInTheDocument();
  });
});
