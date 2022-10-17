# Trouver le plus grand carré
class MaximalSquare
  def get_plateau(plateau, column_number)

    nb = ''
    string = File.read(plateau)
    string.each_char do |c|
      string.slice!(0)
      break if c == "\n"
      nb += c
    end

    nb = nb.to_i
    column_number[0] = 0
    i = 0
    string.each_char do |element|
      column_number[0] = i if element == "\n" && (column_number[0] == 0)
      i += 1
    end
  end



  def get_pos_square(plateau, column_number)
    pos = { 'x' => 0, 'y' => 0, 'size' => 0 }
    new_array = Array.new(column_number, 0)
    y = 0
    while y * (column_number + 1) < plateau.length
      x = 0
      col = 0
      while x < column_number
        tmp = 0
        if plateau[x + y * (column_number + 1)] != 'x'
          tmp = (col < new_array[x] ? col : new_array[x]) + 1
        end
        col = tmp
        new_array[x] = tmp
        tmp = check_square(plateau, x, y, tmp, column_number) if tmp > pos['size']
        if tmp > pos['size']
          pos['x'] = x
          pos['y'] = y
          pos['size'] = tmp
        end
        x += 1
      end
      y += 1
    end
    pos
  end

  def check_square(plateau, x, y, tmp, column_number)
    n = 1
    while n < tmp
      if x - n < 0 || y - n < 0 ||
          check_line(plateau, x - n, y - n, n, column_number) == false
        return n
      end

      n += 1
    end
    n
  end

  def check_line(plateau, x, y, n, column_number)
    i = 0
    while i < n
      if plateau[x + i + y * (column_number + 1)] == 'x' || plateau[x + (y + i) * (column_number + 1)] == 'x'
        return false
      end

      i += 1
    end
    true
  end

  def	displays_square_in_map(plateau, pos, column_number)
    n = 0
    while n < pos['size']
      i = 0
      while i < n + 1
        plateau[(pos['x'] - n) + i + (column_number + 1) * (pos['y'] - n)] = 'o'
        plateau[(pos['x'] - n) + (column_number + 1) * ((pos['y'] - n) + i)] = 'o'
        i += 1
      end
      n += 1
    end
  end
end

# Partie 1: Gestion d'erreur
unless ARGV.size == 1
  puts "*** error ***\n _#{__FILE__}_
  Only one data file."
  exit
end

# Partie 2: Parsing
def main
  obj = MaximalSquare.new
  column_number = []
  plateau = obj.get_plateau(ARGV[0], column_number)
  pos = obj.get_pos_square(plateau, column_number[0])
  obj.displays_square_in_map(plateau, pos, column_number[0])
  plateau
end

# Partie 3: Affichage
puts main