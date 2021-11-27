class CreateCases < ActiveRecord::Migration[6.1]
  def change
    create_table :cases do |t|
      t.belongs_to :winner
      t.belongs_to :looser
      t.timestamps
    end
  end
end
